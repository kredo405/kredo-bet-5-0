import { Card, Col, Row, Statistic } from 'antd';


const Motivation = (props) => {
    const pos = props.info.motivation[0].current_match_text.indexOf('</strong>')
    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Мотивация</h2>
            </div>
            <div className="flex justify-evenly">
                <div className='flex flex-col items-center border-2 border-zinc-400 border-solid rounded-xl py-3 w-36 md:w-56'>
                    <span
                        className={+props.info.motivation[0].motivation_value > props.info.motivation[1].motivation_value ? 'text-green-500 text-2xl' : 'text-red-500 text-2xl'}
                    >
                        {props.info.motivation[0].motivation_value}
                    </span>
                    <span className='text-sm px-2 md:text-xl font-mono'>{props.info.motivation[0].current_match_text.slice(pos + 11)}</span>
                </div>
                <div className='flex flex-col items-center border-2 border-zinc-400 border-solid rounded-xl py-3 w-36 md:w-56'>
                    <span
                        className={+props.info.motivation[1].motivation_value > props.info.motivation[0].motivation_value ? 'text-green-500 text-2xl' : 'text-red-500 text-2xl'}
                    >
                        {props.info.motivation[1].motivation_value}
                    </span>
                    <span className='text-sm px-2 md:text-xl font-mono'>{props.info.motivation[1].current_match_text.slice(pos + 11)}</span>
                </div>
            </div>
        </>
    )
}

export default Motivation