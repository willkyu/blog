---
title: LLM-in-RS.md
author: willkyu
mathjax: false
date: 2024-07-01 13:05:28
categories:
  - Notes
tags:
  - Learning
  - Knowledage-Graphs
  - Papers
---

# 简介

主要来自：

- Tittle: **NoteLLM: A Retrievable Large Language Model for Note Recommendation**
- Time: May 2024
- Conference: WWW

<!-- more -->

# Related Work

LLM Rec的三篇综述：

- 5 *Recommender systems in the era of large language models (llms)*
- 18 *How Can Recommender Systems Benefit from Large Language Models: A Survey*
- 50 *A Survey on Large Language Models for Recommendation.*

主要有三种利用LLM的方法：

## 用于数据增强

由于LLM里包含丰富的世界知识，因而增强的数据比原始数据更突出与多样化。

- 21 *A First Look at LLM-Powered Generative News Recommendation* 利用原有的少量数据使用LLM生成大量额外数据进行下游任务。
- 29 *Large Language Model Augmented Narrative Driven Recommendations* LLM用于叙事驱动推荐
- 51 *Towards Open-World Recommendation with Knowledge Augmentation from Large Language Models* 用LLM生成推理知识与事实知识，使用专家模型来融合嵌入

缺点是需要持续对测试数据进行预处理以便与增强的训练数据保持一致，并且高度依赖于LLM的生成质量。

## 直接推荐

设计特殊的prompts或是使用有监督的微调来引入LLM回答给定的问题。

### 特殊的prompts

- 9 *Recommender AI Agent: Integrating Large Language Models for Interactive Recommendations*
- 20 *Is chatgpt a good recommender? a preliminary study.*
- 43 *RecMind: Large Language Model Powered Agent For Recommendation*

### 有监督微调

- 1 *A Bi-Step Grounding Paradigm for Large Language Models in Recommendation Systems* 微调LLM来对齐推荐空间
- 2 *TALLRec: An Effective and Efficient Tuning Framework to Align Large Language Model with Recommendation* 也是用推荐数据来（微）调大模型
- 59 *Recommendation as Instruction Following: A Large Language Model Empowered Recommendation Approach* 同上

缺点是由于上下文长度限制，这些方法仅侧重于reranking阶段，只包含几十个候选项目。

## 作为编码器生成嵌入

- 15 *Exploring the Upper Limits of Text-Based Collaborative Filtering Using Large Language Models: Discoveries and Insights* 主要针对TCF（Text-based CF）把文本的encoder换成了参数量更大的LLM
- 49 *Empowering News Recommendation with Pre-trained Language Models* 也是新闻推荐，用于生成文本嵌入

缺点是没有利用LLM的生成能力。
