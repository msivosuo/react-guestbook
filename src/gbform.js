/* 
 * gbform.js
 *
 * Copyright (c) 2023 Matti-Pekka Sivosuo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 *copies or substantial portions of the Software.

 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *SOFTWARE.
 */
import { useState } from 'react';
import {databaseUrl} from './shared.js';
import styles from './guestbook.module.css'; 

/*
 * Function GBForm
 * Function for guestbook form. Stores guestbook entry to a
 * json database.
 */
function GBForm() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log("handleChange")	  
    }

    const addJsonEntry = async () =>  {
        const dateAndTime = new Date();
        const data = { date: dateAndTime, name: inputs.guestname, message: inputs.msg };
        const response = await fetch(databaseUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
    }

    const handleSubmit = (event) => {
        if((inputs.guestname && inputs.guestname !== "") && (inputs.msg && inputs.msg !== "")) {
            addJsonEntry();
            console.log("form submitted")
        }
        else {
	          event.preventDefault();    
	          alert("Enter all the needed info!");
	          console.log("form not submitted due to missing data")    
        }    
    }
	

    return (
	      <form onSubmit={handleSubmit}>
            <div className={styles.gbdiv}>
                <div >
                    <label className={styles.gblabel} for="name_input"> Your Name*</label>
                        <input type="text" id="name_input" className={styles.gbinput} onChange={handleChange} value={inputs.guestname || ""} name="guestname" />
                </div>
                <div >
                    <label className={styles.gblabel} for="msg_input"> Your Message*  </label>
                        <textarea rows="5" cols="30 "id="msg_input" className={styles.gbtextarea} value={inputs.msg || ""} onChange={handleChange} name="msg" />
                </div>
                <div >
                    <input className={styles.gbbutton} type="submit" name="submit" />
                </div>
              </div>
        </form>
    );
}


export default GBForm;
