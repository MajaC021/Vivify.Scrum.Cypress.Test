/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
 const fs = require('fs-extra')
 const path = require('path')
 

 module.exports = (on, config) => {
  console.log(config) // see everything in here!
  
  // modify config values
  config.defaultCommandTimeout = 10000
  config.baseUrl = 'https://staging.acme.com'
  
  // modify env var value
  config.env.ENVIRONMENT = 'staging'
  
  // IMPORTANT return the updated config object
  return config
}

 // plugins file
 module.exports = (on, config) => {
   // accept a configFile value or use development by default
   const file = config.env.configFile || 'development'
 
   return getConfigurationByFile(file)
 }

 function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}