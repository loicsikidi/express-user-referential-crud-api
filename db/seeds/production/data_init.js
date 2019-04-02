const ref = require('../../../lib/referential');

exports.seed = (knex, Promise) => {
  return knex("statuses").count('id')
  .then((countStatuses) => {
    if(parseInt(countStatuses[0].count) === 0){
      const statuses = [ 
        {title: ref.STATUS_INTERN_CODE},
        {title: ref.STATUS_SERVICE_PROVIDER_CODE},
        {title: ref.STATUS_TRAINEE_CODE}
      ];
      return knex("statuses").insert(statuses);
    }
  }); 
};