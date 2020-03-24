import axios from "axios";
import { apiURLBase } from "../config";

/**
 * Service Collection Endpoint
 */
export function getServices() {
  return axios.get(`${apiURLBase}services/`);
}

/**
 * Service Detail Endpoint
 */
export function getService(serviceName) {
  return axios.get(`${apiURLBase}services/${serviceName}/`);
}