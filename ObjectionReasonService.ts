const ObjectionReasonService = {
	INSTANCE: {
	  async search() {
		return [
		  { id: "1", label: "Unfair fine" },
		  { id: "2", label: "Technical error" },
		  { id: "3", label: "Incorrect location" }
		];
	  }
	}
  };
  
  export default ObjectionReasonService;