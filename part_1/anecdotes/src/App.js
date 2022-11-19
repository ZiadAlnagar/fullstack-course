import { useState } from "react";

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    ];

    const [selected, setSelected] = useState(0);

    const [votes, setVote] = useState(new Array(anecdotes.length).fill(0));

    const nextRandom = () => {
        let random;
        // Ensures a different quote with every click: random != current
        do {
            random = Math.floor(Math.random() * anecdotes.length);
        } while (random === selected);
        setSelected(random);
    };

    const highest = votes.indexOf(Math.max(...votes));

    const voteUp = () =>
        setVote(Object.assign([...votes], { [selected]: votes[selected] + 1 }));

    return (
        <div>
            <div>
                <Header text="Anecdote of the day" />
                <Anecdote text={anecdotes[selected]} vote={votes[selected]} />
                <Button onClick={voteUp} text="vote" />
                <Button onClick={nextRandom} text="next anecdote" />
            </div>
            <MostVotes anecdote={anecdotes[highest]} vote={votes[highest]} />
        </div>
    );
};

const MostVotes = ({ anecdote, vote }) => {
    return (
        <div>
            <Header text="Anecdote with most votes" />
            <Anecdote text={anecdote} vote={vote} />
        </div>
    );
};

const Anecdote = ({ text, vote }) => <p>{text}<br />has {vote} votes</p>;

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
