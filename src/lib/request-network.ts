import { RequestNetwork, Types, Utils as RequestClientUtils } from "@requestnetwork/request-client.js";

import { IdentityTypes, SignatureProviderTypes, SignatureTypes } from '@requestnetwork/types';
import Utils from '@requestnetwork/utils';

/**
 * Implementation of the signature provider for my wallet
 */
export default class MpcSignatureProvider implements SignatureProviderTypes.ISignatureProvider {
  /** list of supported signing methods */
  public supportedMethods: SignatureTypes.METHOD[] = [SignatureTypes.METHOD.ECDSA];
  /** list of supported identity types */
  public supportedIdentityTypes: IdentityTypes.TYPE[] = [IdentityTypes.TYPE.ETHEREUM_ADDRESS];

  /**
   * Signs data
   *
   * @param string the data to sign
   * @returns Identity the identity to sign with. If not given, the default signer will be used
   *
   * @returns string of the signature
   */
  public async sign(
    data: any,
    signer: IdentityTypes.IIdentity,
  ): Promise<SignatureTypes.ISignedData> {
    if (!this.supportedIdentityTypes.includes(signer.type)) {
      throw Error(`Identity type not supported ${signer.type}`);
    }

    // Hash the normalized data (e.g. avoid case sensitivity)
    const hashData = Utils.crypto.normalizeKeccak256Hash(data).value;

    // call mpc sign
    const signatureValue = mySignaturePackage.sign(hashData, signer.value);

    return {
      data,
      signature: {
        method: SignatureTypes.METHOD.ECDSA,
        value: signatureValue,
      },
    };
  }
}

const mpcSignatureProvider = new MpcSignatureProvider();

const requestClient = new RequestNetwork({
  nodeConnectionConfig: { 
    baseURL: "https://sepolia.gateway.request.network/",
  },
  signatureProvider: mpcSignatureProvider,
});

import {  } from "@requestnetwork/request-client.js";

const payeeIdentity = '0x7eB023BFbAeE228de6DC5B92D0BeEB1eDb1Fd567';
const payerIdentity = '0x519145B771a6e450461af89980e5C17Ff6Fd8A92';
const paymentRecipient = payeeIdentity;
const feeRecipient = '0x0000000000000000000000000000000000000000';

const requestCreateParameters = {
  requestInfo: {
    
    // The currency in which the request is denominated
    currency: {
      type: Types.RequestLogic.CURRENCY.ERC20,
      value: '0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C',
      network: 'sepolia',
    },
    
    // The expected amount as a string, in parsed units, respecting `decimals`
    // Consider using `parseUnits()` from ethers or viem
    expectedAmount: '1000000000000000000',
    
    // The payee identity. Not necessarily the same as the payment recipient.
    payee: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: payeeIdentity,
    },
    
    // The payer identity. If omitted, any identity can pay the request.
    payer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: payerIdentity,
    },
    
    // The request creation timestamp.
    timestamp: RequestClientUtils.getCurrentTimestampInSecond(),
  },
  
  // The paymentNetwork is the method of payment and related details.
  paymentNetwork: {
    id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
    parameters: {
      paymentNetworkName: 'sepolia',
      paymentAddress: payeeIdentity,
      feeAddress: feeRecipient,  
      feeAmount: '0',
    },
  },
  
  // The contentData can contain anything.
  // Consider using rnf_invoice format from @requestnetwork/data-format
  contentData: {
    reason: '🍕',
    dueDate: '2023.06.16',
  },
  
  // The identity that signs the request, either payee or payer identity.
  signer: {
    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: payeeIdentity,
  },
};

const request = await requestClient.createRequest(requestCreateParameters);