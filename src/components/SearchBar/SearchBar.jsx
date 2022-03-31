import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import s from './SearchBar.module.css'

function SearchBar() {
    return (
        <div className={s.display}>
            <div className={s.flights}>Flights</div>
            <input
                type="text"
                placeholder="Enter departure city"
                className={s.input}
            />
            <input
                type="text"
                placeholder="Enter destination city"
                className={s.input}
            />
            <div className={s.dates}>
                <input type="date" placeholder="Date" className={s.date} />
                <input type="date" className={s.date} />
            </div>
            <button className={s.btn}>
                <SearchIcon />
                Search
            </button>
        </div>
    );
}

export default SearchBar;