$(document).ready(function() {

            // display today's date
            const currentDateEl = $("header #currentDay");

            // object to store events
            let calEvents = {};

            // track when calendar was last rendered
            let hourRendered = moment();


            function renderCalendar(today, calEvents) {

                let rowHr = moment(today).hour(9); // start building rows at 9 AM
                const calendar = $("div.container");
                calendar.empty();

                // loop to make rows for hours 9 to 5
                for (let i = 1; i < 10; i++) {

                    const row = $("<div>").addClass("row"); // start building the row for each hour block