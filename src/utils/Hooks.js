import { useEffect, useState, useRef } from "react";
//自定义同步useState
function useSyncState(state) {
    const cbRef = useRef();
    const [data, setData] = useState(state);
    useEffect(
        () => {
            cbRef.current && cbRef.current(data);
        },
        [data]
    );
    return [data, function (val, callback) { cbRef.current = callback; setData(val); }];

}



export { useSyncState };