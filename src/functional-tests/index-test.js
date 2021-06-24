import { Selector } from 'testcafe';

fixture`Rejection Homepage`
  .page('http://localhost:8081');

test('Page should load and display the correct title.', async t => {
  const actual = Selector('h1').innerText;
  const expected = 'Rejections';
  await t.expect(actual).eql(expected);
});

test('Page should load and display the score.', async t => {
  const actual = Selector('h3').innerText;
  const expected = 'Score: ';
  await t.expect(actual).eql(expected);
});