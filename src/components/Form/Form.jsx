import Table from "react-bootstrap/Table";

const Form = ({ data }) => {
    const green = "bg-green-200 flex justify-center font-mono";
    const rose = "bg-rose-200 flex justify-center font-mono";

    return (
        <>
            <h2 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">
                Статистика
            </h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{data.team1_name}</th>
                        <th>{data.team2_name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Победы</td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["2"] >
                                    data.summary[0][1]["2"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][0]["2"]}
                            </p>
                        </td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["2"] <
                                    data.summary[0][1]["2"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][1]["2"]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Ничьи</td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["3"] >
                                    data.summary[0][1]["3"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][0]["3"]}
                            </p>
                        </td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["3"] <
                                    data.summary[0][1]["3"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][1]["3"]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Поражения</td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["4"] <
                                    data.summary[0][1]["4"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][0]["4"]}
                            </p>
                        </td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["4"] >
                                    data.summary[0][1]["4"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][1]["4"]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Индивидуальный тотал</td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["8"] >
                                    data.summary[0][1]["8"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][0]["8"]}
                            </p>
                        </td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["8"] <
                                    data.summary[0][1]["8"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][1]["8"]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Индивидуальный тотал соперников</td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["9"] <
                                    data.summary[0][1]["9"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][0]["9"]}
                            </p>
                        </td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["9"] >
                                    data.summary[0][1]["9"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][1]["9"]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Забитые мячи</td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["5"] >
                                    data.summary[0][1]["5"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][0]["5"]}
                            </p>
                        </td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["5"] <
                                    data.summary[0][1]["5"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][1]["5"]}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Пропущенные мячи</td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["6"] <
                                    data.summary[0][1]["6"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][0]["6"]}
                            </p>
                        </td>
                        <td>
                            <p
                                className={
                                    data.summary[0][0]["6"] >
                                    data.summary[0][1]["6"]
                                        ? green
                                        : rose
                                }
                            >
                                {data.summary[0][1]["6"]}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default Form;
