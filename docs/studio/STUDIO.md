# 《佣书》AI Game Studio

## 治理结构

```mermaid
flowchart TD
    Founder["创始人兼执行制作人（用户）<br/>愿景与最终决策权"]
    MD["Studio 制作总监 Agent<br/>常驻统筹"]
    IR["独立审查总监 Agent<br/>常驻且不参与草案制作"]
    Route{"按风险动态组队"}
    Founder --> MD
    Founder --> IR
    MD --> Route
    Route --> GD["游戏设计组<br/>游戏总监"]
    Route --> NR["叙事与研究组<br/>叙事总监"]
    Route --> AX["美术与体验组<br/>美术总监"]
    Route --> AU["音频组<br/>音频总监"]
    Route --> TD["技术工程组<br/>技术总监"]
    Route --> QA["质量与发行组<br/>QA 总监"]
    Route --> PO["制作与文档组<br/>制作运营总监"]
    GD & NR & AX & AU & TD & QA & PO --> DR["主责总监评审／协作总监会签"]
    DR --> IR
    IR -->|退回| Route
    IR -->|通过| MD
    MD --> Founder
```

## 运行原则

- 常驻角色只有 Studio 制作总监与独立审查总监；专业组按任务启用。
- 每项任务只有一个主责组，每个启用组都有一名总监。
- 每份草案先经主责总监评审，再经独立审查；跨组任务需要协作总监会签。
- 独立审查只因错误、遗漏、冲突、不可接受风险或证据不足退回，不以审美偏好否决。
- 创始人是唯一最终决策者。Agent 不得擅自改变愿景、发布、花费、删除重要数据或执行不可逆操作。
- 完整角色、风险等级和输出协议由全局 `$game-studio` Skill 提供；本文件是《佣书》的项目实例说明。

## 交付链

```mermaid
flowchart LR
    Charter["AGENT.md<br/>项目章程"] --> PRD["PRD<br/>产品真相"]
    PRD --> TDD["TDD<br/>技术真相"]
    PRD --> Brief["任务委托单"]
    TDD --> Brief
    Brief --> Draft["草案／实现"]
    Draft --> Director["总监评审"]
    Director --> Audit["独立审查"]
    Audit --> Authority{"是否需要创始人批准？"}
    Authority -->|"L3/L4、愿景变化或超出现有授权"| Founder["创始人批准"]
    Authority -->|"L0/L1 或既有任务授权"| Verify["实现与验证"]
    Founder --> Verify
```

## 《佣书》当前 Studio 基线

- 产品核心：玩家通过搜集、整理、查验、比对、拼接与编纂史料，寻找“真相”，记录历史。
- “真相”不是唯一官方答案；证据的来源、缺失、立场与传播史必须可被玩家观察和判断。
- 当前产品与技术规格分别见 [PRD](../product/PRD.md) 和 [TDD](../technical/TDD.md)。
