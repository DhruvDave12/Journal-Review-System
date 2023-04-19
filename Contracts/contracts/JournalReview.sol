// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct UserReputation {
    uint256 score;
    uint256 tokenAmount;
}

contract JournalReview {
    event UserReputationUpdated(
        string indexed mongoId,
        uint256 score,
        uint256 tokenAmount
    );

    event UserReceivedTokens(string indexed mongoId, uint256 tokenAmount);

    mapping(string => UserReputation) public userReputationMap;

    // TODO -> SET THESE BARRIERS TO THE CORRECT VALUES
    uint256 private constant TOKEN_TO_GIVE = 50;

    address private constant associateEditor =
        0xd69c42670211857a1c4DE08633FB411C80056989;

    modifier isAssociateEditor() {
        require(
            msg.sender == associateEditor,
            "Only the associate editor can call this function."
        );
        _;
    }

    // @dev function to initialize user reputation
    function initUserReputation(string memory _mongoId) public {
        userReputationMap[_mongoId] = UserReputation(0, 0);
    }

    // @dev function to update user reputation
    function updateUserReputation(
        string[] memory _mongoIds,
        string[] memory _reviewerComments,
        string memory _associateEditorDecision
    ) public isAssociateEditor {
        uint256 yesCount = 0;
        uint256 noCount = 0;

        // Calculate the majority count
        for (uint256 i = 0; i < _reviewerComments.length; i++) {
            if (
                keccak256(abi.encodePacked(_reviewerComments[i])) ==
                keccak256(abi.encodePacked("YES"))
            ) {
                yesCount += 1;
            } else {
                noCount += 1;
            }
        }
        uint256 majCount = (yesCount > noCount) ? yesCount : noCount;
        uint256 minCount = (yesCount < noCount) ? yesCount : noCount;
        uint256 majScore = (majCount * 100) / (majCount + minCount);

        for (uint256 i = 0; i < _mongoIds.length; i++) {
            bool isDecisionMatch = (keccak256(
                abi.encodePacked(_reviewerComments[i])
            ) == keccak256(abi.encodePacked(_associateEditorDecision)));

            if (isDecisionMatch) {
                userReputationMap[_mongoIds[i]].score += majScore;
            } else {
                userReputationMap[_mongoIds[i]].score += (100 - majScore);
            }
            userReputationMap[_mongoIds[i]].tokenAmount += TOKEN_TO_GIVE;
            emit UserReceivedTokens(
                _mongoIds[i],
                userReputationMap[_mongoIds[i]].tokenAmount
            );
        }
    }

    function getUserTokens(
        string memory _mongoID
    ) external view returns (uint256) {
        return userReputationMap[_mongoID].tokenAmount;
    }

    function getUserScore(
        string memory _mongoID
    ) external view returns (uint256) {
        return userReputationMap[_mongoID].score;
    }

    function purchasePremiumContent(string memory _mongoId) public {
        // TODO -> IMPLEMENT THIS FUNCTION
    }
}
