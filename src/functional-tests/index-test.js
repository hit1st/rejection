import { Selector } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

fixture`Rejection Homepage`
  .page('http://localhost:8081');

test('Page should load and display the correct title.', async t => {
  const actual = Selector('h1').innerText;
  const expected = 'Rejections';
  await t.expect(actual).eql(expected);
});

test('Page should load and display the score.', async t => {
  const actual = (await Selector('h3').innerText).includes('Score: ');
  const expected = true;
  await t.expect(actual).eql(expected);
});

test('Page should load and display the score.', async t => {
  const score = ReactSelector('DisplayScore');
  const displayScoreState = await score.getReact();
  const actual = displayScoreState.props.score;
  const expected = 0

  await t.expect(actual).eql(expected);
});