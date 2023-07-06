import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy(
        "BranchRPG",
        {
            from: deployer,
            log: true,
            args: [],
            gasLimit: 200000000
        }
    );
}

export default func;

func.tags = ["BranchRPG", "token"];
