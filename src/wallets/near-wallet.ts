/**
 * NEAR WALLET
 *
 * This sets up and defines a "Wallet", with ability to signIn, signOut, and signAndSendTransactions
 * Feel free to remove individual wallets that are not necessary,
 * It is NOT configured to login to an specific contract.
 */

import { NETWORK_ID } from "../config";
// near api js
import { JsonRpcProvider } from "@near-js/providers";
import { getTransactionLastResult } from "@near-js/utils";

// wallet selector
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import {
  Action,
  NetworkId,
  setupWalletSelector,
} from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { distinctUntilChanged, map } from "rxjs";

export const THIRTY_TGAS = "30000000000000";
export const NO_DEPOSIT = "0";

// What Type is this supposed to be?
type Account = {
  accountId: string;
  active: boolean;
};

export class Wallet {
  /**
   * @constructor
   * @param {string} networkId - the network id to connect to
   * @param {string} createAccessKeyFor - the contract to create an access key for
   * @example
   * const wallet = new Wallet({ networkId: 'testnet', createAccessKeyFor: 'contractId' });
   * wallet.startUp((signedAccountId) => console.log(signedAccountId));
   */
  constructor({
    networkId = NETWORK_ID /*??*/,
    createAccessKeyFor = undefined,
  }: {
    networkId: NetworkId;
    createAccessKeyFor: string | undefined;
  }) {
    // @ts-expect-error - "property does not exist", ya whatever
    this.createAccessKeyFor = createAccessKeyFor;
    // @ts-expect-error - "property does not exist", ya whatever
    this.networkId = networkId;
  }

  /**
   * To be called when the website loads
   * @param {Function} accountChangeHook - a function that is called when the user signs in or out#
   * @returns {Promise<string>} - the accountId of the signed-in user
   */
  startUp = async (
    accountChangeHook: (accountId: string | undefined) => void,
  ) => {
    // @ts-expect-error - "property does not exist", ya whatever
    this.selector = setupWalletSelector({
      // @ts-expect-error - "property does not exist", ya whatever
      network: this.networkId,
      modules: [
        setupMyNearWallet(),
        setupHereWallet(),
        setupMeteorWallet(),
        setupBitteWallet({
          walletUrl:
            (NETWORK_ID as string) === "mainnet"
              ? "https://wallet.bitte.ai"
              : "https://testnet.wallet.bitte.ai",
          callbackUrl: window.location.href,
          // contractId: "yourcontract.near", // add if you want limited access keys to be generated
          deprecated: false,
        }),
      ],
    });

    // @ts-expect-error - "property does not exist", ya whatever
    const walletSelector = await this.selector;
    const isSignedIn = walletSelector.isSignedIn();
    const accountId = isSignedIn
      ? walletSelector.store.getState().accounts[0].accountId
      : "";

    walletSelector.store.observable
      .pipe(
        // @ts-expect-error - "property does not exist", ya whatever
        map((state) => state.accounts),
        distinctUntilChanged(),
      )
      .subscribe((accounts: Account[]) => {
        const signedAccount = accounts.find(
          (account) => account.active,
        )?.accountId;
        accountChangeHook(signedAccount!);
      });

    return accountId;
  };

  /**
   * Displays a modal to login the user
   */
  signIn = async () => {
    // @ts-expect-error - "property does not exist", ya whatever
    const modal = setupModal(await this.selector, {
      // @ts-expect-error - "property does not exist", ya whatever
      contractId: this.createAccessKeyFor,
    });
    modal.show();
  };

  /**
   * Logout the user
   */
  signOut = async () => {
    // @ts-expect-error - "property does not exist", ya whatever
    const selectedWallet = await (await this.selector).wallet();
    selectedWallet.signOut();
  };

  /**
   * Signs and sends a transaction
   * @param param0
   * @returns
   */
  signAndSendTransaction = async ({
    contractId,
    actions,
  }: {
    contractId: string;
    actions: Action[];
  }) => {
    // @ts-expect-error - "property does not exist", ya whatever
    const selectedWallet = await (await this.selector).wallet();

    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: contractId,
      actions: actions,
    });

    return getTransactionLastResult(outcome);
  };

  /**
   * Makes a call to a contract
   * @param {string} txhash - the transaction hash
   * @returns {Promise<JSON.value>} - the result of the transaction
   */
  getTransactionResult = async (txhash: string) => {
    // @ts-expect-error - "property does not exist", ya whatever
    const walletSelector = await this.selector;
    const { network } = walletSelector.options;
    const provider = new JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return getTransactionLastResult(transaction);
  };

  /**
   * Converts wallet selector account to near-api-js Account object
   * @returns {Promise<Account>} - the resulting Account object
   */
  getAccount = async () => {
    // @ts-expect-error - "property does not exist", ya whatever
    const walletSelector = await this.selector;
    const accounts = walletSelector.store.getState().accounts;
    if (!accounts.length) throw new Error("No signed-in accounts found");

    return accounts[0];
  };
}
