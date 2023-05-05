// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Pizza {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] public memos;

    address payable owner; //Owner is going to recieve funds

    constructor() {
        owner = payable(msg.sender);
    }

    function buyPizza(
        string calldata name,
        string calldata message
    ) external payable {
        require(msg.value > 0, "Please pay to buy Pizza");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
