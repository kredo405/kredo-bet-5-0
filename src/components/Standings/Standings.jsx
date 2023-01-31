import { Table } from 'antd';

const Standings = ({ info }) => {
    const columns = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
        },
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team',
        },
        {
            title: 'Goals',
            dataIndex: 'goals',
            key: 'goals',
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
        },
    ];

    const data = info.table[0].map((el, i) => ({
        key: i,
        rank: i + 1,
        team: (
            <div className="flex justify-start items-center">
                <img
                    className="w-3/12 sm:w-2/12 md:w-1/12"
                    src={el[3]}
                    alt="logo"
                />
                <span className="pl-3">{el[2]}</span>
            </div>
        ),
        goals: `${el[10]}/${el[11]}`,
        points: el[14],
    }));

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">Таблица</h2>
            </div>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default Standings;
