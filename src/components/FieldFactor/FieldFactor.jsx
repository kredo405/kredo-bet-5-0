import { Progress } from 'antd';

const FieldFactor = ({ info }) => {

    const calcPercentSuccess = (array, name) => {
        const numbersOutcomesHome = [];
        const numbersOutcomesAway = [];
        const maxNumber = array.length * 3;

        array.forEach(el => {
            const scoreHome = el.score[0] + el.score[2];
            const scoreAway = el.score[1] + el.score[3];

            if (el.team1_name === name) {

                if (scoreHome > scoreAway) {
                    numbersOutcomesHome.push(3);
                }
                if (scoreHome === scoreAway) {
                    numbersOutcomesHome.push(1);
                }
                if (scoreHome < scoreAway) {
                    numbersOutcomesHome.push(0);
                }
            }
            if (el.team2_name === name) {

                if (scoreAway > scoreHome) {
                    numbersOutcomesAway.push(3);
                }
                if (scoreHome === scoreAway) {
                    numbersOutcomesAway.push(1);
                }
                if (scoreHome > scoreAway) {
                    numbersOutcomesAway.push(0);
                }
            }
        });

        const homeSum = numbersOutcomesHome.reduce((sum, current) => {
            return sum + current;
        }, 0);
        const awaySum = numbersOutcomesAway.reduce((sum, current) => {
            return sum + current;
        }, 0);

        const percentHome = homeSum * 100 / maxNumber;
        const percentAway = awaySum * 100 / maxNumber;

        return {
            percentHome,
            percentAway
        }
    }

    const percentHome = calcPercentSuccess(info.matches[0], info.team1_name);
    const percentAway = calcPercentSuccess(info.matches[1], info.team2_name);

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Фактор поля</h2>
            </div>
            <div className="flex justify-between">
                <div className='flex flex-col'>
                    <h3 className='text-center mb-3 font-bold'>{info.team1_name}</h3>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-3">
                            <span className='mb-3'>Дома</span>
                            <Progress type="circle" percent={percentHome.percentHome.toFixed(0)} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} width={60} />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className='mb-3'>В гостях</span>
                            <Progress type="circle" percent={percentHome.percentAway.toFixed(0)} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} width={60} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h3 className='text-center mb-3 font-bold'>{info.team2_name}</h3>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-3">
                            <span className='mb-3'>Дома</span>
                            <Progress type="circle" percent={percentAway.percentHome.toFixed(0)} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} width={60} />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className='mb-3'>В гостях</span>
                            <Progress type="circle" percent={percentAway.percentAway.toFixed(0)} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} width={60} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FieldFactor;