import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAllJobApplications, deleteOneJobApplication } from '../../utils/jobs-service';
import DeleteJobApplicationModal from "../../components/Modal/DeleteJobApplicationModal";
import { getUser } from '../../utils/users-service';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [ allJobApplications, setAllJobApplications ] = useState([]);
    const [ modalShow, setModalShow ] = useState(false);
    const [ selectedJobApplication, setSelectedJobApplication ] = useState(null);
    // const [ jobApplicationData, setJobApplicationData ] = useState(null);


    //? display all jobs
    useEffect(() => {
        async function fetchAllJobsApplications() {
            const currentUser = getUser();
            console.log(currentUser);
            try {
                const jobApplication = await getAllJobApplications(currentUser._id);
                setAllJobApplications(jobApplication);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobsApplications();
    }, []);

    //? Close modal without action
    function handleCloseModal() {
        setModalShow(false);
    }

    //? Delete job application after confirmation and closing modal
    async function handleDeleteJobApplicationConfirmation() {
        if (selectedJobApplication) {
            await handleDeleteJobApplication();
            handleCloseModal();
        }
    }
    //? Render Delete Confirmation Modal
    async function handleDeleteButtonClick(event) {
        event.preventDefault();
        const jobApplicationId = event.currentTarget.getAttribute("data-id");
        setSelectedJobApplication(jobApplicationId);
        setModalShow("delete");
    }

    //? Render Edit Company Modal
    // async function handleEditButtonClick(event) {
    //     event.preventDefault();
    //     const jobApplicationId = event.currentTarget.getAttribute("data-id");
    //     const fetchJobApplicationData = allJobApplications.find(jobApplication => jobApplication._id === jobApplicationId);
    //     setCompanyData(fetchJobApplicationData);
    //     setModalShow("edit");
    //     }

    async function handleDeleteJobApplication() {
        if (selectedJobApplication) {
            await deleteOneJobApplication(selectedJobApplication);
            const updatedJobApplications = allJobApplications.filter(jobApplications => jobApplications._id !== selectedJobApplication);
            setAllJobApplications(updatedJobApplications);
            setModalShow(false);
            setSelectedJobApplication(null);
        }
    }

    return (
        <>
            <DeleteJobApplicationModal
            show={modalShow == "delete"}
            onHide={handleCloseModal}
            onDelete={handleDeleteJobApplicationConfirmation}
            />
            {/* {jobApplicationData && (
            <EditCompanyModal
            show={modalShow == "edit"}
            onHide={handleCloseModal}
            companyId={companyData._id}
            originalData = {{
                companyName: companyData.companyName,
                companyAddress: companyData.companyAddress,
                country: companyData.country,
                industry: companyData.industry
            }}
            allCompanies={allCompanies}
            setAllCompanies={setAllCompanies}
            />
            )} */}

            <h1>Dashboard</h1>
            {allJobApplications.length === 0 ? (
            <p>Oops, looks like you have yet to track an application! Click <Link to="/job-application">here</Link> to start!</p>
            ) : (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Minimum Salary</th>
                        <th>Maximum Salary</th>
                        <th>Job Type</th>
                        <th>Application Date</th>
                        <th>Status</th>
                        <th>Interview</th>
                        <th>Offer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {allJobApplications.map((jobApplication, idx) => {
                    const { companyName, position, salaryMin, salaryMax, jobType, applicationDate, status, interviews, offer } = jobApplication;
                    return (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{companyName}</td>
                            <td>{position}</td>
                            <td>{salaryMin}</td>
                            <td>{salaryMax}</td>
                            <td>{jobType}</td>
                            <td>{applicationDate}</td>
                            <td>{status}</td>
                            <td>{interviews}</td>
                            <td>{offer}</td>
                            <td>
                                {/* <button className="btn btn-primary" style={{ marginRight: "15px" }} onClick={handleEditButtonClick} data-id={company._id}>Edit</button> */}
                                <button className="btn btn-danger" style={{ margin: "auto" }} onClick={handleDeleteButtonClick} data-id={jobApplication._id}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            )}
        </>
    );
}