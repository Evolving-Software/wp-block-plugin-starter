// Copyright (C) 2022 RDS Ventures LLC
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

export default function Deprecated() {
    return (
        [
            {
                attributes: {
                    "title": "Pricing Calculator"
                },
                save: function (props) {
                    return (
                        <>
                            <p {...useBlockProps.save()}>
                                {"Pricing Calculator – hello from the sfdsfsdfaved content!"}
                            </p>
                            <label htmlFor="myInput">Project Managers</label>

                            < input type="text" id="myInput" value="Hello World" />
                        </>
                    );
                }
            }
        ]
    )
}