export type ForceIdentifier = string;

export type Availability = {
  date: string;
  "stop-and-search": ForceIdentifier[];
};

export type Category = {
  url: string;
  name: string;
};

export type Force = {
  id: ForceIdentifier;
  name: string;
};

export type LastUpdated = {
  date: string;
};

export type Crime = {
  category: Category;
  location: {
    latitude: string;
    longitude: string;
    street: {
      name: string;
    };
  };
  location_type: string;
  context: string;
  outcome_status: {
    category: string;
    date: string;
  } | null;
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
};

export type StopAndSearch = {
  age_range: string;
  outcome: string;
  involved_person: boolean;
  self_defined_ethnicity: string;
  gender: string;
  legislation: string;
  outcome_linked_to_object_of_search: boolean;
  datetime: string;
  removal_of_more_than_outer_clothing: boolean;
  outcome_object: {
    id: string;
    name: string;
  };
  location: {
    latitude: string;
    street: {
      id: number;
      name: string;
    };
    longitude: string;
  };
  operation: boolean;
  officer_defined_ethnicity: string;
  type: string;
  operation_name: string;
  object_of_search: string;
};
