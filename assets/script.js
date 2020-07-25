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
                    // set colors for time blocks for past, present and future
                    let classOfHour = "";
                    if (today.isBefore(rowHr, "hour")) {
                        classOfHour = "future"
                    } else if (today.isAfter(rowHr, "hour")) {
                        classOfHour = "past"
                    } else {
                        classOfHour = "present"
                    };

                    calendar.append(row);
                    // add hour column to row
                    row.append($("<div>").addClass("col-2 hour").text(rowHr.format("h A")));
                    // add event description column to row
                    let timeBlock = rowHr.format("hA"); // keys for data in calEvents object to populate textarea
                    row.append($("<textarea>").addClass(`col-8 ${classOfHour}`).text(calEvents[timeBlock]));
                    // add save button column to row
                    row.append($("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save").attr("id", rowHr.format("hA")));

                    // increment hour before creating next row
                    rowHr.add(1, "hour");

                    // set calendar render time
                    hourRendered = moment();
                };
            };


            // initialize calendar
            function initCalendar() {
                const today = moment(); // set today's date
                currentDateEl.text(today.format('LL'));
                renderCalendar(today, calEvents);
            };
            // load events from local storage
            function loadCal() {
                const storedCal = JSON.parse(localStorage.getItem("calEvents"));
                if (storedCal) {
                    calEvents = storedCal;
                };
            };