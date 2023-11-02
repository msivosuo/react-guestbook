/* 
 * gblist.js
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

import {useEffect, useState} from 'react';
import {databaseUrl} from './shared.js';
import styles from './guestbook.module.css'; 

/*
 * Function GBEntry
 * Function for guestbook entry. Returns a formatted entry list item
 */
function GBEntry(props) {
    const formattedDate = Intl.DateTimeFormat('fi-fI', {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Helsinki",
    }).format(new Date(props.date));	
    return (
	    <li className={styles.gbentry}>
	        {formattedDate} - {props.name}: {props.message}
      </li>
    );
}	

/*
 * Function GBEntryList
 * Function for guestbook entry list. Returns a formatted entry list.
 */
function GBEntryList() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(databaseUrl);
                const json = await response.json();
                console.log(json);
                setEntries(json);    
            } catch (error) {
                console.log("error in fetching data from the db", error);
            }
        };
	      fetchData();    
    }, []);

    
    function compareDates(a, b) {
        const dateA = new Date(a.date).getTime();	
        const dateB = new Date(b.date).getTime();
        if (dateA > dateB) {
            return -1;
        } else if (dateA < dateB) {
            return 1;
        } else {
            return 0;
        }
    }

    return (
        <>	
            <h2>Guestbook Entry List</h2>
                <ol className={styles.gblist}>
                    {entries.sort(compareDates).map((entry) => { 
                        return (
                            <GBEntry key={entry.id} date={entry.date} name={entry.name} message={entry.message} />  
                        );
                    })}	    
                </ol>
        </>
    );
}


export default GBEntryList
