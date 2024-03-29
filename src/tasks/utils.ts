import { Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import weth9Networks from "../../node_modules/canonical-weth/networks.json";
import { TypedDataDomain } from "../ts/ethers";

export function domain(
  chainId: number,
  verifyingContract: string,
): TypedDataDomain {
  return {
    name: "AccessManager",
    version: "v1",
    chainId,
    verifyingContract,
  };
}

export async function getEasyAuctionContract({
  ethers,
  deployments,
}: HardhatRuntimeEnvironment): Promise<Contract> {
  const authenticatorDeployment = await deployments.get("EasyAuction");

  const authenticator = new Contract(
    authenticatorDeployment.address,
    authenticatorDeployment.abi,
  ).connect(ethers.provider);

  return authenticator;
}
export async function getAllowListOffChainManagedContract({
  ethers,
  deployments,
}: HardhatRuntimeEnvironment): Promise<Contract> {
  const authenticatorDeployment = await deployments.get(
    "AllowListOffChainManaged",
  );

  const authenticator = new Contract(
    authenticatorDeployment.address,
    authenticatorDeployment.abi,
  ).connect(ethers.provider);

  return authenticator;
}

export async function getDepositAndPlaceOrderContract({
  ethers,
  deployments,
}: HardhatRuntimeEnvironment): Promise<Contract> {
  const depositAndPlaceOrderDeployment = await deployments.get(
    "DepositAndPlaceOrder",
  );

  const authenticator = new Contract(
    depositAndPlaceOrderDeployment.address,
    depositAndPlaceOrderDeployment.abi,
  ).connect(ethers.provider);

  return authenticator;
}

export async function getWETH9Address(
  hre: HardhatRuntimeEnvironment,
): Promise<string> {
  // Todo: to be refactored...
  let weth9Address = "";
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  if (chainId == 4) {
    weth9Address = weth9Networks.WETH9["4"]["address"];
  } else if (chainId == 1) {
    weth9Address = weth9Networks.WETH9["1"]["address"];
  } else if (chainId == 137) {
    weth9Address = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
  } else if (chainId == 56) {
    weth9Address = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  } else if (chainId == 97) {
    weth9Address = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
  } else if (chainId == 100) {
    weth9Address = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
  } else if (chainId == 43113) {
    weth9Address = "0xd9d01a9f7c810ec035c0e42cb9e80ef44d7f8692"; // wrapped avax
  } else if (chainId == 43114) {
    weth9Address = "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"; // wrapped avax
  } else if (chainId == 5) {
    weth9Address = "0x60d4db9b534ef9260a88b0bed6c486fe13e604fc";
  } else if (chainId == 80001) {
    weth9Address = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";
  } else if (chainId == 11155111) {
    weth9Address = "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92";
  } else if (chainId == 42161) {
    weth9Address = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
  } else if (chainId == 8453) {
    weth9Address = "0x4200000000000000000000000000000000000006";
  } else if (chainId == 84531) {
    weth9Address = "0x4200000000000000000000000000000000000006";
  } else if (chainId == 10200) {
    weth9Address = "0x014A442480DbAD767b7615E55E271799889FA1a7";
  } else if (chainId == 324) {
    weth9Address = "0x8Ebe4A94740515945ad826238Fc4D56c6B8b0e60";
  } else if (chainId == 280) {
    weth9Address = "0x20b28B1e4665FFf290650586ad76E977EAb90c5D";
  }
  return weth9Address;
}

export const isAvaxNetwork = (chainId: number): boolean =>
  chainId === 43113 || chainId === 43114;
