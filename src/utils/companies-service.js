import * as companiesAPI from "./companies-api";

export async function createCompany(inputCompanyData) {
	const { companyName, companyLocation, country, industry  } = inputCompanyData;
	const companyFormData = { companyName, companyLocation, country, industry };

    try {
        const response = await companiesAPI.createCompany(companyFormData);
        return response;
    } catch (error) {
        throw new Error("Could Not Create Company");
    }
}

export async function getAllCompanies() {
    try {
        const response = await companiesAPI.getAllCompanies();
        console.log("Response from companiesAPI:", response);
        return response;
    } catch (error) {
        throw new Error("Could Not Get Companies");
    }
}

export async function getOneCompany(companyId) {
    try {
        const response = await companiesAPI.getOneCompanies(companyId);
        return response;
    } catch (error) {
        throw new Error("Could Not Get Company");
    }
}

export async function updateCompany(companyId, inputCompanyData) {
    const { companyName, companyLocation, country, industry  } = inputCompanyData;
    const companyFormData = { companyName, companyLocation, country, industry };

    try {
        const response = await companiesAPI.updateCompany(companyId, companyFormData);
        return response;
    } catch (error) {
        throw new Error("Could Not Update Company");
    }
}
export async function deleteOneCompany(companyId) {
    try {
        const response = await companiesAPI.deleteOneCompany(companyId);
        return response;
    } catch (error) {
        throw new Error("Could Not Delete Company");
    }
}