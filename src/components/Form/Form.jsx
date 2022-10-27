import Table from 'react-bootstrap/Table';

const Form = (props) => {
    const data = props.data
    const homeName = props.homeName
    const awayName = props.awayName
    const green = 'bg-green-200 flex justify-center font-mono';
    const rose = 'bg-rose-200 flex justify-center font-mono';

    return (
        <>
            <h2 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">Статистика</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{homeName}</th>
                        <th>{awayName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Победы</td>
                        <td><p
                            className={+data.winsHome.slice(0, 2) > +data.winsAway.slice(0, 2) ? green : rose}>{data.winsHome}
                            </p></td>
                        <td><p className={+data.winsAway.slice(0, 2) > +data.winsHome.slice(0, 2) ? green : rose}>{data.winsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Ничьи</td>
                        <td><p className={+data.drawHome.slice(0, 2) > +data.drawAway.slice(0, 2) ? green : rose}>{data.drawHome}</p></td>
                        <td><p className={+data.drawAway.slice(0, 2) > +data.drawHome.slice(0, 2) ? green : rose}>{data.drawAway}</p></td>
                    </tr>
                    <tr>
                        <td>Поражения</td>
                        <td><p className={+data.losesAway.slice(0, 2) > +data.losesHome.slice(0, 2) ? green : rose}>{data.losesHome}</p></td>
                        <td><p className={+data.losesHome.slice(0, 2) > +data.losesAway.slice(0, 2) ? green : rose}>{data.losesAway}</p></td>
                    </tr>
                    <tr>
                        <td>Тотал меньше 2.5</td>
                        <td><p className={+data.totalUnderHome.slice(0, 2) > +data.totalUnderAway.slice(0, 2) ? green : rose}>{data.totalUnderHome}</p></td>
                        <td><p className={+data.totalUnderAway.slice(0, 2) > +data.totalUnderHome.slice(0, 2) ? green : rose}>{data.totalUnderAway}</p></td>
                    </tr>
                    <tr>
                        <td>Тотал больше 2.5</td>
                        <td><p className={+data.totalOverHome.slice(0, 2) > +data.totalOverAway.slice(0, 2) ? green : rose}>{data.totalOverHome}</p></td>
                        <td><p className={+data.totalOverAway.slice(0, 2) > +data.totalOverHome.slice(0, 2) ? green : rose}>{data.totalOverAway}</p></td>
                    </tr>
                    <tr>
                        <td>Обе забили Да</td>
                        <td><p className={+data.btsHome.slice(0, 2) > +data.btsAway.slice(0, 2) ? green : rose}>{data.btsHome}</p></td>
                        <td><p className={+data.btsAway.slice(0, 2) > +data.btsHome.slice(0, 2) ? green : rose}>{data.btsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Удары</td>
                        <td><p className={+data.shotsHome > +data.shotsAway ? green : rose}>{data.shotsHome}</p></td>
                        <td><p className={+data.shotsAway > +data.shotsHome ? green : rose}>{data.shotsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Удары противника</td>
                        <td><p className={+data.shotsVsAway > +data.shotsVsHome ? green : rose}>{data.shotsVsHome}</p></td>
                        <td><p className={+data.shotsVsHome > +data.shotsVsAway ? green : rose}>{data.shotsVsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Удары в створ</td>
                        <td><p className={+data.shotsOnTargetHome > +data.shotsOnTargetAway ? green : rose}>{data.shotsOnTargetHome}</p></td>
                        <td><p className={+data.shotsOnTargetAway > +data.shotsOnTargetHome ? green : rose}>{data.shotsOnTargetAway}</p></td>
                    </tr>
                    <tr>
                        <td>Удары в створ пр.</td>
                        <td><p className={+data.shotsOnTargetVsAway > +data.shotsOnTargetVsHome ? green : rose}>{data.shotsOnTargetVsHome}</p></td>
                        <td><p className={+data.shotsOnTargetVsHome > +data.shotsOnTargetVsAway ? green : rose}>{data.shotsOnTargetVsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Время отдыха ч/д</td>
                        <td><p className={+data.relaxationHome.slice(1, 3) > +data.relaxationAway.slice(5, 7) ? green : rose}>{data.relaxationHome}</p></td>
                        <td><p className={+data.relaxationAway.slice(5, 7) > +data.relaxationHome.slice(1, 3) ? green : rose}>{data.relaxationAway}</p></td>
                    </tr>
                    <tr>
                        <td>Владение</td>
                        <td><p className={+data.possesionHome > +data.possesionAway ? green : rose}>{data.possesionHome}</p></td>
                        <td><p className={+data.possesionAway > +data.possesionHome ? green : rose}>{data.possesionAway}</p></td>
                    </tr>
                    <tr>
                        <td>Владение противника</td>
                        <td><p className={+data.possesionVsAway > +data.possesionVsHome ? green : rose}>{data.possesionVsHome}</p></td>
                        <td><p className={+data.possesionVsHome > +data.possesionVsAway ? green : rose}>{data.possesionVsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Офсайды</td>
                        <td><p className={+data.ofsidesHome > +data.ofsidesAway ? green : rose}>{data.ofsidesHome}</p></td>
                        <td><p className={+data.ofsidesAway > +data.ofsidesHome ? green : rose}>{data.ofsidesAway}</p></td>
                    </tr>
                    <tr>
                        <td>Офсайды противника</td>
                        <td><p className={+data.ofsidesVsAway > +data.ofsidesVsHome ? green : rose}>{data.ofsidesVsHome}</p></td>
                        <td><p className={+data.ofsidesVsHome > +data.ofsidesVsAway ? green : rose}>{data.ofsidesVsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Голы забитые</td>
                        <td><p className={+data.goalsForAvgHome > +data.goalsForAvgAway ? green : rose}>{data.goalsForAvgHome}</p></td>
                        <td><p className={+data.goalsForAvgAway > +data.goalsForAvgHome ? green : rose}>{data.goalsForAvgAway}</p></td>
                    </tr>
                    <tr>
                        <td>Голы пропущенные</td>
                        <td><p className={+data.goalsAgainstAvgAway > +data.goalsAgainstAvgHome ? green : rose}>{data.goalsAgainstAvgHome}</p></td>
                        <td><p className={+data.goalsAgainstAvgHome > +data.goalsAgainstAvgAway ? green : rose}>{data.goalsAgainstAvgAway}</p></td>
                    </tr>
                    <tr>
                        <td>Фолы</td>
                        <td><p className={+data.foulsHome > +data.foulsAway ? green : rose}>{data.foulsHome}</p></td>
                        <td><p className={+data.foulsAway > +data.foulsHome ? green : rose}>{data.foulsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Фолы противника</td>
                        <td><p className={+data.foulsVsAway > +data.foulsVsHome ? green : rose}>{data.foulsVsHome}</p></td>
                        <td><p className={+data.foulsVsHome > +data.foulsVsAway ? green : rose}>{data.foulsVsAway}</p></td>
                    </tr>
                    <tr>
                        <td>Угловые</td>
                        <td><p className={+data.cornersHome > +data.cornersAway ? green : rose}>{data.cornersHome}</p></td>
                        <td><p className={+data.cornersAway > +data.cornersHome ? green : rose}>{data.cornersAway}</p></td>
                    </tr>
                    <tr>
                        <td>Угловые противника</td>
                        <td><p className={+data.cornersVsAway > +data.cornersVsHome ? green : rose}>{data.cornersVsHome}</p></td>
                        <td><p className={+data.cornersVsHome > +data.cornersVsAway ? green : rose}>{data.cornersVsAway}</p></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Form;

