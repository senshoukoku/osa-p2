const Course = ({course}) => {
const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return(
        <>
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => (
                    <li key={part.id}>
                        {part.name} - {part.exercises} exercises
                    </li>
                ))}
            </ul>
            <p><strong>Total Exercises: {total}</strong></p>
        </div>
        </>
    )
}

export default Course