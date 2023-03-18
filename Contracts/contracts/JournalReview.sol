// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract JournalReview is Initializable, OwnableUpgradeable {
    function initialize(address _owner) public payable initializer {
        __Ownable_init();
        transferOwnership(_owner);
    }
}
