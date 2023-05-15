import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Scores = ({ correctScoreMatch }) => {
    const [scores, setScores] = useState(
        <tr>
            <td colSpan={4}>
                <p className="text-center">No data</p>
            </td>
        </tr>
    );

    useEffect(() => {
        const elements = correctScoreMatch.map((el, i) => {
            const key = Object.keys(el)[0];
            return (
                <tr key={key}>
                    <td>
                        <p className="text-center">{key.slice(-3)}</p>
                    </td>
                    <td>
                        <p className="text-center text-blue-200">
                            {el[key].odd}
                        </p>
                    </td>
                    <td>
                        <p className="text-center text-blue-200">
                            {el[key].percent}%
                        </p>
                    </td>
                    <td>
                        <p className="text-center text-blue-200">
                            {el[key].money}
                        </p>
                    </td>
                </tr>
            );
        });

        if (correctScoreMatch[0].score0_0.percent) {
            setScores(elements);
        }
    }, [correctScoreMatch]);

    return (
        <div className="container">
            <div className="flex justify-center mb-3">
                <h1 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">
                    Денежные потки в счетах
                </h1>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>
                            <p className="text-center">Счет</p>
                        </th>
                        <th>
                            <p className="text-center">Кэф</p>
                        </th>
                        <th>
                            <p className="text-center">%</p>
                        </th>
                        <th>
                            <p className="text-center">Деньги</p>
                        </th>
                    </tr>
                </thead>
                <tbody>{scores}</tbody>
            </Table>
        </div>
    );
};

export default Scores;
