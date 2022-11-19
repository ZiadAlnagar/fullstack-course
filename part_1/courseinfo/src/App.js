const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Content = (props) => (
    <div>
        {props.parts.map(({ name, exercises }, i) => (
            <Part key={i} name={name} exercises={exercises} />
        ))}
    </div>
);

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const Total = ({ parts }) => (
    <p>
        Number of exercises{" "}
        {parts.reduce((total, part) => total + part.exercises, 0)}
    </p>
);

export default App;
