import { Avatar, List } from 'antd';

const Facts = ({ info }) => {

    const newArrFacts = info.facts.map(el => {
        const arr1 = el[0].split('>');
        const arr2 = arr1.map(item => {
            if (item === '<strong') {
                return '';
            }
            const pos1 = item.indexOf('<strong');
            let str1 = '';

            if (pos1 !== -1) {
                str1 = item.slice(0, pos1);
            };

            if (str1 === '') {
                return item
            }
            if (str1 !== '') {
                return str1
            }
        });
        const arr3 = arr2.map(item => {
            if (item === '</strong') {
                return '';
            }
            const pos1 = item.indexOf('</strong');
            let str1 = '';

            if (pos1 !== -1) {
                str1 = item.slice(0, pos1);
            };

            if (str1 === '') {
                return item
            }
            if (str1 !== '') {
                return str1
            }
        });

        return [arr3.join(' '), el[1]];
    })

    return (
        <>
            <div className="flex justify-center mb-3">
                <h2 className='text-center py-3 font-serif text-xl font-bold text-slate-600'>Факты</h2>
            </div>
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={newArrFacts}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<p className='font-lg font-semibold'>{item[0]}</p>}
                                description={item[1]}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

export default Facts;