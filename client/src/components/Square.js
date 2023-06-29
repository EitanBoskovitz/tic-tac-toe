import React from "react";

function Sqaure({chooseSquare, value}) {
    return <div className="sqaure" onClick={chooseSquare}>
        {value}
    </div>
}
export default Sqaure