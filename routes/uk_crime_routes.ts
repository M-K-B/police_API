import { Router } from "../deps.ts";
import {
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
} from "../controllers/uk_crime_controller.ts";

const router = new Router();

// Static routes
router.get("/available-data", getAvailableData);
router.get("/categories", getCategories);
router.get("/forces", getForces);
router.get("/last-updated", getLastUpdate);
router.get("/street-level-crimes", getStreetLevelCrimes);
router.get("/stop-search-no-location", getStopSearchNoLocation);
router.get("/stop-search-area", getStopSearchArea);
router.get("/stop-search-location", getStopSearchLocation);
router.get("/stop-search-force", getStopSearchForce);

// Dynamic routes
router.get("/force/:forceId", getForce);
router.get("/force/:forceId/people", getForcePeople);

router.get("/outcomes-at-location", getOutcomesAtLocation); // needs query params lat,lng
router.get("/crimes-at-location", getCrimesAtLocation); // needs query params lat,lng
router.get("/crimes-no-location", getCrimesNoLocation); // needs query params

router.get("/neighbourhoods/:forceId", getNeighbourhoods);
router.get("/neighbourhood/:forceId/:neighbourhoodId", getNeighbourhood);
router.get("/:forceId/:neighbourhoodId/boundary", (ctx) => {
  ctx.response.body = {
    message: "Matched forceId/neighbourhoodId/boundary",
    forceId: ctx.params.forceId,
    neighbourhoodId: ctx.params.neighbourhoodId,
  };
});
router.get(
  "/neighbourhood-team/:forceId/:neighbourhoodId",
  getNeighbourhoodTeam,
);
router.get(
  "/neighbourhood-events/:forceId/:neighbourhoodId",
  getNeighbourhoodEvents,
);
router.get(
  "/neighbourhood-priorities/:forceId/:neighbourhoodId",
  getNeighbourhoodPriorities,
);

router.get("/locate-neighbourhood", locateNeighbourhood); // needs postcode query param
router.get("/outcomes-for-crime/:crimeId", getOutcomesForCrime);

export default router;
