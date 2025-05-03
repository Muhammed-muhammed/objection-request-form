const ObjectionRequestService = {
	INSTANCE: {
	  async saveOrUpdate(model: any, callback: any) {
		console.log("Saving model...", model);
		setTimeout(() => {
		  callback();
		}, 1000);
	  }
	}
  };
  
  export default ObjectionRequestService;
  