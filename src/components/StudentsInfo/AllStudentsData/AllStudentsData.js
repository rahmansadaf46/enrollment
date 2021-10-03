import React from 'react';
import { Link } from 'react-router-dom';

const AllStudentsData = ({ students }) => {
    return (
        <div>

            <table className="table ">
                <thead style={{ background: '#6C757D', }}>
                    <tr>
                        <th className="text-white text-center" scope="col">Sr.</th>
                        <th className="text-white text-center" scope="col">Name</th>
                        <th className="text-white" scope="col">Roll Number</th>
                        <th className="text-white" scope="col">Department</th>
                        <th className="text-white" scope="col"></th>
                    </tr>
                </thead>


                <tbody >
                    

                    {
                        students.map((student, index) =>

                            <tr key={student._id} style={{ background: 'white' }}>
                                <td className=" text-center"><span className="mt-5">{index+1}</span></td>
                                <td className=" text-center"><span className="mt-5">{student.name}</span></td>
                                <td>{student.roll}</td>
                                <td><b>{student.department}</b></td>
                                <td className=""><Link to={`/students/profile/${student.department}/${student.roll}`} className="btn btn-secondary btn-sm">Details</Link></td>
                            </tr>
                        )
                    }

                </tbody>

            </table>
{/* 
                    <ul>
                  
                        {
                            students.map((student)=> <li>{student.roll}</li> )
                        }
                    </ul> */}


        </div>

    );
};

export default AllStudentsData;