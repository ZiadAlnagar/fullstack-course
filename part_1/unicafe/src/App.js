import { useState } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const rate = {
        good: "good",
        neutral: "neutral",
        bad: "bad",
    };

    const setFeedback = (rate) => () => {
        switch (rate) {
            case "good":
                return setGood(good + 1);
            case "neutral":
                return setNeutral(neutral + 1);
            case "bad":
                return setBad(bad + 1);
            default:
                return null;
        }
    };

    return (
        <div>
            <Header text="give feedback" />
            <Button onClick={setFeedback(rate.good)} text={rate.good} />
            <Button onClick={setFeedback(rate.neutral)} text={rate.neutral} />
            <Button onClick={setFeedback(rate.bad)} text={rate.bad} />
            <Statistics good={good} neutral={neutral} bad={bad} rate={rate} />
        </div>
    );
};

const Statistics = ({ good, neutral, bad, rate }) => {
    const all = good + neutral + bad;
    const rateSum = good * 1 + neutral * 0 + bad * -1;
    const average = rateSum / all;
    const postivie = good / all;

    return all !== 0 ? (
        <div>
            <Header text="statistics" />
            <table>
                <tbody>
                    <StatisticLine text={rate.good} value={good} />
                    <StatisticLine text={rate.neutral} value={neutral} />
                    <StatisticLine text={rate.bad} value={bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={postivie} />
                </tbody>
            </table>
        </div>
    ) : (
        <p>No feedback given</p>
    );
};

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
