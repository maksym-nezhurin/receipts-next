'use client'

import {ClipLoader} from "react-spinners";

const cssOverride = {
    display: 'block',
    margin: '100px auto'
};

const Spinner = ({ loading = true, override }: { loading: boolean, override?: {}}) => {
    return <ClipLoader
        color={'#3bf69f'}
        loading={loading}
        cssOverride={override || cssOverride}
        size={150}
        aria-label={"Loading Spinner"}
    />
}

export default Spinner;