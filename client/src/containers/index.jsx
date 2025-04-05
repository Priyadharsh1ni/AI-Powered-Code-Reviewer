import React, { useState } from 'react'
import axios from 'axios'
import style from './style.css'


function Index() {

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("");
    const [response, setResponse] = useState("");
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);

    const handleresponse = async (e) => {
        if (!code || !language) {
            setAlert("Please enter code and language");
        } else if (!code) {
            setAlert("Please enter code");
        } else if (!language) {
            setAlert("Please enter language");
        } else {
            setLoading(true);
            const { data } = await axios.post(`http://localhost:3000/`, {
                code: code,
                language: language

            });
            setResponse(data.text);
            setLoading(false);
        }
    }
    console.log("🚀 ~ handleresponse ~ response:", response)

    const handleTryAgain = async () => {
        setLoading(true);
        setResponse("");
        const { data } = await axios.post(`http://localhost:3000/`, {
            code: code,
            language: language

        });
        setResponse(data.text);
        setLoading(false);
    }

    return (
        <div className={!response ? 'container' : 'container-response'}>
            {!loading && <>
                {!response && <div className='card'>
                    <div className='header'>
                        <h1>Code Reviewer</h1>
                        <div className='input'>
                            <h4>Paste your code here</h4>
                            <input type="text" placeholder="Search..." onChange={(e) => setCode(e.target.value)} className='input-box' />
                            {!code && alert && <p style={{ color: "red" }}>{alert}</p>}
                        </div>
                        <div className='input'>
                            <h4>Enter the language</h4>
                            <input type="text" placeholder="Language..." onChange={(e) => setLanguage(e.target.value)} className='input-box' />
                            {!language && alert && <p style={{ color: "red" }}>{alert}</p>}
                        </div>
                        <div >
                            <button className='button' type="button" onClick={handleresponse}>Review code</button>
                        </div>
                    </div>
                </div>}
                {response && <div className='response'><div >
                    <div dangerouslySetInnerHTML={{ __html: response }} />
                </div>
                    <button className='button' type="button" onClick={handleTryAgain} >Try Again</button></div>}
            </>}
           {loading && <div id="loader">
            <h5>Please Wait...</h5>
                <div class="spinner"></div>
            </div>}
        </div>
    )
}

export default Index