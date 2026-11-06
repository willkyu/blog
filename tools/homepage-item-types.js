'use strict';

const DEFAULT_CONTRACT_URL = 'https://raw.githubusercontent.com/willkyu/willkyu.github.io/main/public/homepage-item-types.json';

class HomepageContractError extends Error {
  constructor(message) {
    super(`Homepage item types contract: ${message}`);
    this.name = 'HomepageContractError';
  }
}

function assertStringArray(value, field) {
  if (!Array.isArray(value) || value.some(item => typeof item !== 'string' || !item)) {
    throw new HomepageContractError(`${field} must be an array of non-empty strings`);
  }
  if (new Set(value).size !== value.length) {
    throw new HomepageContractError(`${field} must not contain duplicates`);
  }
}

function validateHomepageItemTypesContract(contract) {
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
    throw new HomepageContractError('root value must be an object');
  }
  if (!Number.isSafeInteger(contract.contractVersion) || contract.contractVersion < 1) {
    throw new HomepageContractError('contractVersion must be a positive integer');
  }
  if (!Number.isSafeInteger(contract.feedSchemaVersion) || contract.feedSchemaVersion < 1) {
    throw new HomepageContractError('feedSchemaVersion must be a positive integer');
  }
  if (!contract.feedItem || typeof contract.feedItem !== 'object' || Array.isArray(contract.feedItem)) {
    throw new HomepageContractError('feedItem must be an object');
  }

  const { requiredFields, optionalFields, forbiddenFields, unknownFields } = contract.feedItem;
  assertStringArray(requiredFields, 'feedItem.requiredFields');
  assertStringArray(optionalFields, 'feedItem.optionalFields');
  assertStringArray(forbiddenFields, 'feedItem.forbiddenFields');
  if (unknownFields !== 'reject') {
    throw new HomepageContractError('feedItem.unknownFields must be "reject"');
  }

  const fieldGroups = [...requiredFields, ...optionalFields, ...forbiddenFields];
  if (new Set(fieldGroups).size !== fieldGroups.length) {
    throw new HomepageContractError('required, optional, and forbidden feed fields must not overlap');
  }

  if (!Array.isArray(contract.itemTypes) || !contract.itemTypes.length) {
    throw new HomepageContractError('itemTypes must be a non-empty array');
  }
  const appearances = new Set();
  for (const [index, itemType] of contract.itemTypes.entries()) {
    if (!itemType || typeof itemType !== 'object' || Array.isArray(itemType)) {
      throw new HomepageContractError(`itemTypes[${index}] must be an object`);
    }
    if (typeof itemType.appearance !== 'string' || !itemType.appearance) {
      throw new HomepageContractError(`itemTypes[${index}].appearance must be non-empty text`);
    }
    if (appearances.has(itemType.appearance)) {
      throw new HomepageContractError(`itemTypes repeats appearance "${itemType.appearance}"`);
    }
    if (typeof itemType.coverRequired !== 'boolean') {
      throw new HomepageContractError(`itemTypes[${index}].coverRequired must be boolean`);
    }
    appearances.add(itemType.appearance);
  }

  return contract;
}

async function loadHomepageItemTypesContract() {
  const url = process.env.HOMEPAGE_ITEM_TYPES_URL || DEFAULT_CONTRACT_URL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let response;
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
  } catch (error) {
    throw new HomepageContractError(`could not fetch ${url}: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new HomepageContractError(`could not fetch ${url}: HTTP ${response.status}`);
  }

  let contract;
  try {
    contract = JSON.parse(await response.text());
  } catch (error) {
    throw new HomepageContractError(`${url} is not valid JSON: ${error.message}`);
  }
  return validateHomepageItemTypesContract(contract);
}

module.exports = {
  DEFAULT_CONTRACT_URL,
  HomepageContractError,
  loadHomepageItemTypesContract,
  validateHomepageItemTypesContract
};
