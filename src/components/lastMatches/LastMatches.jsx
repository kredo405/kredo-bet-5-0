const LastMatches = ({ data }) => {
    const matchesHome = data.matches[0];
    const matchesAway = data.matches[1];

    function timestampToDate(timeStamp) {
        const date = new Date(timeStamp);
        return date.toLocaleDateString();
    }

    const createElementsMatches = (arr) => {
        const elementsMatches = arr.map((el, i) => {
            return (
                <li
                    key={i}
                    className="flex justify-between items-center py-2 border-b-2 border-slate-200 border-solid "
                >
                    <span className="w-2/12 lg:w-1/12 mr-2 text-center text-xs lg:text-lg font-sans font-medium">
                        {timestampToDate(el.date)}
                    </span>
                    <div className="w-4/12 flex lg:pl-10 items-center">
                        <img
                            className="w-[20px] h-[20px]"
                            src={el.team1_logo}
                            alt="Логотип"
                        />
                        <span className="text-center px-1 text-xs lg:text-lg text-blue-900 font-mono font-bold">
                            {el.team1_name}
                        </span>
                    </div>
                    <div className="w-4/12 flex items-center">
                        <img
                            className="w-[20px] h-[20px]"
                            src={el.team2_logo}
                            alt="Логотип"
                        />
                        <span className="text-center px-1 text-xs lg:text-lg text-blue-900 font-mono font-bold">
                            {el.team2_name}
                        </span>
                    </div>
                    <span className="w-1/12 lg:w-3/12 mt-3 text-center text-xs lg:text-lg font-sans font-medium text-red-400">
                        {el.score[0] + el.score[2]} :{" "}
                        {el.score[1] + el.score[3]}
                    </span>
                </li>
            );
        });

        return elementsMatches;
    };

    const elementsMatchesHome = createElementsMatches(matchesHome);
    const elementsMatchesAway = createElementsMatches(matchesAway);

    return (
        <div className="container">
            <div className="flex justify-center my-4">
                <h1 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">
                    Последние матчи {data.team1_name}
                </h1>
            </div>
            <ul>{elementsMatchesHome}</ul>
            <div className="flex justify-center my-4">
                <h1 className="text-center py-3 font-serif text-2xl font-bold text-slate-600">
                    Последние матчи {data.team2_name}
                </h1>
            </div>
            <ul>{elementsMatchesAway}</ul>
        </div>
    );
};

export default LastMatches;
