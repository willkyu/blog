---
title: 时序知识图谱笔记与知识图谱推理的机遇挑战
author: willkyu
mathjax: true
categories:
  - Notes
tags:
  - Learning
  - Knowledage-Graphs
  - Papers
date: 2023-02-13 13:20:21
---

# 简介

主要来自：

- Tittle: **Reasoning over Different Types of Knowledge Graphs: Static, Temporal and Multi-Modal**
- Author: Ke Liang, Lingyuan Meng, Meng Liu, Yue Liu, Wenxuan Tu, Siwei Wang, Sihang Zhou, Xinwang Liu , Senior Member, IEEE, Fuchun Sun, Fellow, IEEE
- Time: 24 Jan 2023
- Journal:

<!-- more -->

# 定义

时序知识图谱推理（Temporal Knowledge Graph Reasoning）：
Given a temporal knowledge graph

$$
\mathcal{TKG=\{SKG_1, SKG_2, SKG_3, \ldots, SKG_t\}}
$$

where $\mathcal{SKG_t=\{E,R,F_t\}}$ and timestamp $t \in \mathcal{T}$.
With the queried fact $(e^q_h, r^q, e^q_t, t^q)$, reasoning can be classified into three types, including entity reasoning, relation reasoning and timestamp reasoning.

![Fig.1](/images/body/Papers/TKG-Note/Fig1.png)

根据queried fact的时间，推理又分为两类：interpolation reasoning 和 extrapolation reasoning（内推和外推）。详见Fig.1.

# 模型

主要分为RNN-based Model和RNN-agnostic Model。

## RNN-based Model

RNN很适合挖掘时间的变化，因此很多TKGR模型使用RNN来直接建模时序信息，称为RNN-based Model。
根据使用的RNN的变种，可以分为三类：RNN、LSTM和GRU。

就先不细看了。

## RNN-agnostic Model

这些模型不适用RNN框架来采用时序信息，从而扩充原始的static KGR模型。时间信息如何指导模型，可以将其大致分为两类：time-vector guided models 和 time-operation guided models。

### Time-Vector Guided Model

时间向量引导模型直接为时序信息生成附加时序嵌入t并将其作为附加信息与原始事实嵌入结合。虽然简单，但是模型效果主要依赖于时间编码器和嵌入融合模块是否合适。

### Time-Operation Guided Model

时间操作引导模型利用一些特定的操作来组合时序信息到实体和关系嵌入中而不是直接生成时序嵌入t。比如将事实编码到设计的特定时间超平面中，并生成与时间相关的奖励。

RNN-agnostic Model比起RNN-based Model更为灵活。但是RNN-based Model对时间信息建模的最好而且更容易使用在外推场景中。外推场景仍在早期阶段，有很大发展空间。

# 数据集

原文写的很多，可以直接看原文4.2节。

# 机遇与挑战

## 分布外推理 Out-of-distribution Reasoning

使用增量对事实的推理叫做分布外推理，这对KGR模型的设计要求很高。最近一些尝试 为**推断不可见实体**提供了潜在方案，被称为 归纳推理模型。这些模型不考虑实体的具体含义，只挖掘图结构下的逻辑规则，取得了良好的性能。对于**不可见关系推断**，少镜头KGR模型倾向于提高模型的泛化能力，使训练后的模型能够很好地拓展到含有少量事实的不可见关系上。也就是说，少镜头KGR模型可以根据之前学习的相似知识快速学习新的任务。此外BERTRL试图根据语言模型计算出的文本语义来处理这种情况。而当语言模型没有得到很好的训练时，这些模型的性能会急剧下降。综上所述，分布外推理任务的KGR模型仍处于早期阶段，值得未来深入探索。

## 大尺度推理 Large-scale Reasoning

工业知识图谱都相当的大，需要更加有效率的KGR模型。因此当前有些工作尝试以渐进的方式优化传播过程。

## 多关系推理 Multi-relational Reasoning

![Fig.2](/images/body/Papers/TKG-Note/Fig2.png)

多关系在知识图谱中是很常见的，和uni-relational、bi-relational facts相比有更多样的结构和更复杂的语义，因此现今的KGR模型主要关注uni-relational、bi-relational facts，甚至常常将多关系简化视作uni-relational、bi-relational facts。这样的KGR模型不能准确地模拟真实情况，丢失了大量有意义的语义信息，导致表达能力不足。未来有必要研究如何利用多关系事实来提高推理能力。
