import faunadb from 'faunadb';

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET
});

const useID = async (userName = "Imposter Developer") => await client.query(
  q.Select(["ref", "id"], q.Get(q.Match(q.Index("user_id_by_name"), userName)))
);

const useRejections = async (id = "304846704870425155") => {
  const data = await client.query(
    q.Select(["data"],
      q.Map(
        q.Paginate(
          q.Match(q.Index("rej_by_user"), q.Ref(q.Collection("User"), id))
        ),
        q.Lambda(rejection => ({
          id: q.Select(["ref", "id"], q.Get(rejection)),
          question: q.Select(["data", "question"], q.Get(rejection)),
          askee: q.Select(["data", "askee"], q.Get(rejection)),
          status: q.Select(["data", "status"], q.Get(rejection)),
          timestamp: q.Select(["data", "created_at"], q.Get(rejection)),
        }))
      )
    )
  );
      console.log('api useRejection data: ', data);
  return data;
};

const createRejection = async (newRejection = {}, userID) => {
  const { data, ref } = await client.query(
    q.Create(q.Collection("Rejection"), {
      data: {
        ...newRejection,
        // created_at: q.Time("now"),
        created_at: Date(),
        user: q.Ref(q.Collection("User"), userID),
      }
    })
  );

  const { question, askee, status, created_at } = data;
  return { 
    question,
    askee,
    status,
    timestamp: created_at,
    id: ref.value.id
  };
};

export { useID, useRejections, createRejection };
