import { Empty, BackTop, Spin } from 'antd';

const Comment = (props) => {
    const predictions = props.data
    const elements = predictions.map((el, i) => {
        return (
            <li key={i} className="p-3 border-2 border-blue-100 border-double my-4 rounded-lg shadow-lg shadow-cyan-50">
                <h2 className="text-center text-lg font-semibold my-3">
                    <span className="bg-lime-300 p-2 mr-2">{el.scoreHome}</span>
                    :
                    <span className="bg-lime-300 p-2 ml-2">{el.scoreAway}</span>
                </h2>
                <p className="font-sans text-zinc-600 font-medium">{el.text}</p>
            </li>
        )
    })
    return (
        <>
            <div>
                <h2 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">Комментарии</h2>
                <ul className="h-96 mb-36 lg:px-60">
                    {elements.length !== 0 ? elements :
                        <Empty
                            description={
                                <span className="font-mono text-lg font-medium text-gray-700">
                                    На данный момент нет комментариев
                                </span>
                            }
                        />}
                </ul>
            </div>
        </>
    )
}

export default Comment;