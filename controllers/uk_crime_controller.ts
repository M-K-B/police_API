import { Context } from "../deps.ts";
import { Endpoint, urlfetch } from "../utils.ts";

import {
  handleFlexibleQueryFetch,
  handlePathReplace,
  handleQueryFetch,
  handleSimpleFetch,
} from "../helper/fetchHelpers.ts";

// Static endpoints
const getAvailableData = (ctx: Context) =>
  handleSimpleFetch(ctx, Endpoint.AVAILABILITY);
const getCategories = (ctx: Context) =>
  handleSimpleFetch(ctx, Endpoint.CATEGORIES);
const getForces = (ctx: Context) => handleSimpleFetch(ctx, Endpoint.FORCES);
const getLastUpdate = (ctx: Context) =>
  handleSimpleFetch(ctx, Endpoint.LAST_UPDATED);

// Crime data with query
const getStreetLevelCrimes = (ctx: Context) =>
  handleFlexibleQueryFetch(ctx, Endpoint.STREET_LEVEL);
const getCrimesAtLocation = (ctx: Context) =>
  handleQueryFetch(ctx, Endpoint.CRIMES_AT_LOCATION, ["lat", "lng"]);
const getCrimesNoLocation = (ctx: Context) =>
  handleQueryFetch(ctx, Endpoint.CRIMES_NO_LOCATION, [
    "category",
    "force",
    "date",
  ]);
const getOutcomesAtLocation = (ctx: Context) =>
  handleQueryFetch(ctx, Endpoint.OUTCOMES_AT_LOCATION, ["lat", "lng"]);
const locateNeighbourhood = (ctx: Context) =>
  handleQueryFetch(ctx, Endpoint.LOCATE_NEIGHBOURHOOD, ["q"]);

// Stop and search
const getStopSearchNoLocation = (ctx: Context) =>
  handleQueryFetch(ctx, Endpoint.STOP_SEARCH_NO_LOCATION, ["force"]);
const getStopSearchArea = (ctx: Context) =>
  handleFlexibleQueryFetch(ctx, Endpoint.STOP_SEARCH_AREA);
const getStopSearchLocation = (ctx: Context) =>
  handleQueryFetch(ctx, Endpoint.STOP_SEARCH_LOCATION, ["location_id"]);
const getStopSearchForce = (ctx: Context) =>
  handleQueryFetch(ctx, Endpoint.STOP_SEARCH_FORCE, ["force"]);

// Forces with path params
const getForce = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.FORCE, { force: ctx.params.forceId });
const getForcePeople = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.FORCE_PEOPLE, { force: ctx.params.forceId });

// Neighbourhoods
const getNeighbourhoods = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.NEIGHBOURHOODS, {
    force: ctx.params.forceId,
  });
const getNeighbourhood = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.NEIGHBOURHOOD, {
    force: ctx.params.forceId,
    neighbourhood: ctx.params.neighbourhoodId,
  });
const getNeighbourhoodBoundary = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.NEIGHBOURHOOD_BOUNDARY, {
    force: ctx.params.forceId,
    neighbourhood: ctx.params.neighbourhoodId,
  });
const getNeighbourhoodTeam = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.NEIGHBOURHOOD_TEAM, {
    force: ctx.params.forceId,
    neighbourhood: ctx.params.neighbourhoodId,
  });
const getNeighbourhoodEvents = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.NEIGHBOURHOOD_EVENTS, {
    force: ctx.params.forceId,
    neighbourhood: ctx.params.neighbourhoodId,
  });
const getNeighbourhoodPriorities = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.NEIGHBOURHOOD_PRIORITIES, {
    force: ctx.params.forceId,
    neighbourhood: ctx.params.neighbourhoodId,
  });

const getOutcomesForCrime = (ctx: Context) =>
  handlePathReplace(ctx, Endpoint.OUTCOMES_FOR_CRIME, {
    crime_id: ctx.params.crimeId,
  });

export {
  getAvailableData,
  getCategories,
  getCrimesAtLocation,
  getCrimesNoLocation,
  getForce,
  getForcePeople,
  getForces,
  getLastUpdate,
  getNeighbourhood,
  getNeighbourhoodBoundary,
  getNeighbourhoodEvents,
  getNeighbourhoodPriorities,
  getNeighbourhoods,
  getNeighbourhoodTeam,
  getOutcomesAtLocation,
  getOutcomesForCrime,
  getStopSearchArea,
  getStopSearchForce,
  getStopSearchLocation,
  getStopSearchNoLocation,
  getStreetLevelCrimes,
  locateNeighbourhood,
};
