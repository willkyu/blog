---
title: 宝可梦有电的红蓝宝石实机乱数（不包含 ID 或 Egg）
author: willkyu
date: 2021-12-14 08:10:35
categories:
  - Pokemon
tags:
  - Pokemon
  - Pokemon-RNG-Abuse
  - Pokemon-Gen3
---

这是宝可梦有电红蓝宝石的实机乱数教程.
不包含 ID 与 Egg 的乱数教程.
如有纰漏，请[与我联系](/about/)，万分感谢！

<!-- more -->

**注意，本教程仅支持：有电的红蓝宝石.**

> 2024.10.29 Update: ***RS***的RTC2seed可以通过bcd数来转换，从而使得乱数更加方便了。可以替换掉下面步骤中的确定seed部分。[参考RTC2seed](https://github.com/Wokann/FeebasSpotCalculate/blob/main/src/rtc2seed.c#L81-L81)。

```c
DayCounts = ConvertDateToDatCount(CurrentRtc.year, CurrentRtc.month, CurrentRtc.day);
MinuteCounts = (24 * 60) * DayCounts + 60 * CurrentRtc.hour_BCD + CurrentRtc.minute_BCD;
seed = (MinuteCounts >> 16) ^ (MinuteCounts & 0xFFFF);
```

如果你在找绿宝石及没电红蓝宝石的红蓝宝石实机乱数教程，请点击[这里](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/).

如果你在找火红叶绿的实机乱数，请点击[这里](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part3/).

> 实机很难实现，难度很高.

> 成果展示:
  ![Result](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Result.png)

# 准备工作

如果你想要乱数闪光宝可梦，你需要知道你的[SID](https://wiki.52poke.com/wiki/ID_No.#.E9.87.8CID_No.).

> 如果你想要乱数的是已经创建好的存档，这可能会需要你导出存档并使用 *PKHex* 等软件查看你的存档（不涉及修改与导入），请根据自身接受程度使用.（本教程默认读者使用*NDS*烧录卡进行存档提取来方便查看个体）

> 由于我没有怎么研究过乱数ID，所以如果你想要乱数ID，请参考：[Smogon ID 乱数教程](https://www.smogon.com/ingame/rng/rs_nonbredrng#idsid).<br>
> 之后如果自己研究了一遍就会上传Blog.

> 不会导出存档？看看这篇博客：[如何备份你的存档](/Pokemon/Strategies/In-Game/How-To-Back-Up-Your-Savefiles/).

## 硬件准备

- 能够游玩第三世代宝可梦卡带的*NDS*系列机器（初代 *NDS* 或 *NDS lite*，以下统称 *NDS*）.
- 电脑.
- *NDS*烧录卡与读卡器.

> 本教程默认读者使用*NDS*烧录卡进行存档提取来方便查看个体，如若抗拒，请参考 [宝可梦绿宝石及没有电的红蓝宝石实机乱数（不包含 ID 或 Egg）](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/) 中提及的方法（使用神奇糖果）.

## 下载乱数所需工具

- 计时器[CCTimer](/download/CCTimer.rar)
  因为没有找到该软件的发布页，所以上传至仓库可直接点击下载，如果你知道它的发布页，请与我联系.
- 乱数工具[3genSearch](https://www.dropbox.com/sh/68qqg26op3uaymc/AAC8QFFKYxAqQjG80abgcHZ1a?dl=0)
  国内需要科学上网，因原作者禁止二次发布所以这里不提供直接下载，可以通过各搜索引擎找到别人的分享.
- 乱数工具[RNGReporter](https://github.com/Admiral-Fish/RNGReporter/releases)
  如果因为国内 GitHub 下载速度原因不好下载，可以点击[这里](/download/RNGReporter.zip)进行下载.
- 时钟修复软件[rtcread](https://wiki.52poke.com/wiki/%E6%97%B6%E9%92%9F%E7%94%B5%E8%B7%AF%EF%BC%88%E6%BC%8F%E6%B4%9E%EF%BC%89#.E5.A4.96.E9.83.A8.E9.93.BE.E6.8E.A5)
  将`.nds`文件放在烧录卡的储存卡中. 也可以点击[这里](/download/rtcread-ds.rar)进行下载.
- 存档编辑软件[PKHex](https://github.com/kwsch/PKHeX/releases)
  将使用其查看宝可梦的个体，不会涉及到存档修改.
  如果因为国内 GitHub 下载速度原因不好下载，可以点击[这里](/download/PKHeX(190705).zip)进行下载（版本：19.07.05）.
- seed查找工具[FRLGSeedFinder](https://www.smogon.com/forums/threads/rng-manipulation-in-firered-leafgreen-wild-pok%C3%A9mon-supported-in-rng-reporter-9-93.62357/)
  如果选用3genSearch可以不用此工具. 也可以点击[这里](/download/FRLGSeedFinder.zip)进行下载.

> 两个乱数工具选择任意一个都可以，本教程使用的是 *3genSearch*. RNGReporter的使用与之类似，还请读者自行探索.

## 了解乱数机制

请参考[宝可梦绿宝石及没有电的红蓝宝石实机乱数（不包含 ID 或 Egg）](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/#了解乱数机制) 中的相应部分.
这里不同的是，我们需要知道有电的红蓝宝石（以下简称 ***RS***）进入游戏的初始 seed. 而 ***RS*** 的初始 seed 在每一分钟都是相同的，也就是说，控制进入游戏时 *RTC* 的时间在同一分钟就可以固定住初始 seed，因此我们使用时钟修复软件 rtcread.

> 我在参阅外网资料时有看到，***RS*** 的初始 seed 每分钟推进 1，但实际操作中发现并不是这样. 有时会推进 1，有时会推进或者倒退很多（但不会太多，大约 2~16左右）. 因此 seed 并不会变化太快.

> 2024.10.29 Update: ***RS***的RTC2seed可以通过bcd数来转换，从而使得乱数更加方便了。

## 确定乱数目标

与[宝可梦绿宝石及没有电的红蓝宝石实机乱数（不包含 ID 或 Egg）](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/#确定乱数目标)相同.
***如果选择了野外相遇的宝可梦，请在队伍中准备一只习得了[甜甜香气](https://wiki.52poke.com/wiki/%E7%94%9C%E7%94%9C%E9%A6%99%E6%B0%94%EF%BC%88%E6%8B%9B%E5%BC%8F%EF%BC%89#.E5.8F.AF.E4.BB.A5.E5.AD.A6.E4.BC.9A.E8.AF.A5.E6.8B.9B.E5.BC.8F.E7.9A.84.E5.AE.9D.E5.8F.AF.E6.A2.A6)的宝可梦.***
确定乱数目标后，选择相应的 *Method*. 如果是乱数蛋，请参阅[这里](https://www.smogon.com/ingame/rng/emerald_rng_part4).

### *Method 1*

- 御三家（***RS***、***E*** 一周目与 ***E*** 二周目）
- 定点宝可梦
- 釜炎镇 NPC 赠送的小果然的蛋
- ***RS*** 通过甜甜香气遭遇的宝可梦
- ***RS*** 通过钓鱼遭遇的宝可梦（除丑丑鱼）
- ***RS*** 通过碎岩遭遇的宝可梦

### *Method 2*

- 草丛/海草/深沙/洞穴/水上/可以遇到宝可梦的建筑中通过移动/转向 遭遇的宝可梦（除了游走宝可梦）
- ***E*** 通过甜甜香气遭遇的宝可梦
- ***E*** 钓鱼钓上来的宝可梦
- ***E*** 通过碎岩遇到的宝可梦

### *Method 4*

- 钓鱼钓上来的丑丑鱼

如果是 *Method 1*中的前三类，点击下面的谜拟Q来查看保存游戏的位置与生成帧的所在时机（ ***E*** 与 ***RS*** 有些会有区别）：
<details>
    <summary><img no-lazy src="/images/mimikyu.png" alt="Method 2 请点击丘丘" align=left></summary>
     <br>
    -- 御三家：在博士的包前保存，在问你“Do you choose this POKéMON?”时等待生成帧 <br>
    -- 飘浮泡泡：在反派干部前保存，在研究员说“It might be an odd way of thanking you, but take this POKéMON.”时等待生成帧 <br>
    -- 游走水都：击败冠军后在出自己的房间门前存档，在让你选择红蓝时等待生成帧 <br>
    -- 复活化石：在研究员前保存，在他说“The fossil was an ancient POKéMON. [LILEEP/ANORITH], it was!”时等待生成帧 <br>
    -- 小果然的蛋：在 NPC 前存档，在她说“Good! I hope you'll walk plenty with this here EGG!”时等待生成帧 <br>
    -- 变隐龙：在隐形的变隐龙前存档，在提示“The startled POKéMON attacked!”时等待生成帧 <br>
    -- 大吾的铁哑铃：在精灵球前存档，在选择是否拿走时等待生成帧 <br>
    -- 胡说树：在其面前存档，在提示“The weird tree attacked!”时等待生成帧 <br>
    -- 盖欧卡与固拉多：在距离剧情触发前一步存档，在进入战斗前最后一段时等待生成帧 <br>
    -- 凤王：Save on the first space of the peak of the cliff. Last input is pressing up on the directional pad to place yourself on the second space of the cliff. <br>
    -- 梦幻：Save in the area it appears in. Last input is a press of the A button to "tag" it. <br>
    -- 其他：在宝可梦/触发物前保存，在进入战斗前最后一段时等待生成帧 <br>
     <br>
    凤王和梦幻的不知道怎么表达比较好，看英文感受一下.
  </details>
<br><br>

如果是 *Method 2* 或 *Method 1* 的后三类，在进入战斗前最后一次点击作为生成帧.

> 实际生成帧可能会更往后，如甜甜香气，但这段时间是固定的，可以通过多次尝试来更新.

# 开始乱数

## 确定初始seed

1. 在*NDS*上插入 ***RS*** 游戏卡带与烧录卡.
    ![Figure1](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure1.png)
2. 打开烧录卡，选择时钟修复软件 rtcread 运行.
    ![Figure2](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure2.png)
3. 按下 *start* 键，你可以看到当前 ***RS*** 卡带的RTC.
    ![Figure3](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure3.png)
4. 按下 *select* 键，进入修改RTC时间模式.
5. 选择一个时间，并且让秒数归零，如图选择的是 **2002-10-31 10:42:00**.
    ![Figure4](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure4.png)
6. 按下 *start* 键，并尽快关机.
7. 尽快开机进入游戏，任意捕捉一只宝可梦后存档并关机（宝可梦相遇越快越好）.
8. 使用 NDS烧录卡 提取游戏存档后使用 PKHex 打开.
9. 找到你捕捉的宝可梦，右击选择 *查看* 并选择左侧选项卡的 *数值*.
    ![Figure5](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure5.png)
10. 打开乱数工具，选择*个体逆算*，并根据 PKHex 中的数据填入并点击 *计算*（游戏版本与地点、相遇方式等也别忘了修改）
    再根据PKHex左侧选项卡的 *主页面* 确定 *开始seed*（第一列）或 *生成seed*（第二列）（如果有多个无法区分，都记下，并可能需要再来一次. 此外，其实只要保证**pid**相同即可）.
    ![Figure6](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure6.png)
    ![Figure7](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure7.png)
11. 右击复制该*开始seed*，选择*其他-初期seed检索* ，将复制的*开始seed*填入*目标seed*，勾选上 *初期seed全探索*.
    [F] 处第二个空填入18000左右即可（根据你遇到这只宝可梦的游戏时间决定，一分钟约3600 F），点击 *计算*.
    > 图中实例宝可梦并非游戏一开始就遇到的，仅为教程作参考，以实际为准.
    ![Figure8](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure8.png)
12. 记下F最接近实际相遇时间的*初期seed*. 这就是该RTC时间下的初始seed

> 之后的步骤与[宝可梦绿宝石及没有电的红蓝宝石实机乱数（不包含 ID 或 Egg）](/Pokemon/Strategies/In-Game/RNG/Pokemon-RNG-Abuse-Gen3-Part1/#开始乱数)相应部分类似，但每次开始游戏前需要执行一遍步骤2~6，且需尽快开机进入游戏以确保seed不变.

## 搜索目标宝可梦

打开乱数工具，选择/填入图中红框中内容：
![Figure1](/images/body/Pokemon-RNG-Abuse-Gen3-Part1/Figure1.png)

1. 根据乱数目标选择*固定*或*野生*.
2. 如果选择了*野生*，可以修改绿框中的地点、版本信息.
3. 输入之前得到的初期 seed.
4. F为搜索帧数的范围，建议800~10000，因为 seed 固定了所以可能很靠后才有你想要的帧.（1秒约60帧，请自行推测是否有耐心）（请根据实际情况调整，如甜甜香气动画较长，所以起始帧会高一些）.
5. *Method* 选择之前确定的 *Method*.
6. 检索区域根据自己的需要填写，若勾选 ***只显示异色*** ，需要在勾选框上方填入表里ID.
7. 点击黑框*计算*，得到结果.

> 没有想要的宝可梦怎么办？<br>
> 不建议帧数再加了，10w帧约27.8分钟了，可以试着降低一下要求.

> 闪帧太靠后了怎么办？<br>
> 回到 [确定初始 seed](#确定初始seed)步骤，并在第五步选择一个不同的时间（精确到 min）.

在结果中选择一个满意的结果作为目标帧，将其 ***F*** 栏（即为你的*目标帧*）填入蓝框中（蓝框后面的内容不需要管）.

## 校准误差

***如果你的目标宝可梦不是野外宝可梦（如定点宝可梦），那么要在步骤1结束后，将存档备份***

1. 在游戏中你应该存档的位置存档（如果你准备在洞穴或是能出现宝可梦的建筑中使用甜甜香气，请往深处走一些距离，否则甜甜香气可能会失效），存档完成后关机.
2. 打开计时器 *CCTimer*，选择 *Setting*，点击红框内容，根据游戏平台选择对应选项.
   ![Figure2](/images/body/Pokemon-RNG-Abuse-Gen3-Part1/Figure2.png)
3. 回到 *Timer*，在蓝框内填入你刚刚的 *目标帧* 并点击 ***Add*** .
   ![Figure3](/images/body/Pokemon-RNG-Abuse-Gen3-Part1/Figure3.png)
4. ***执行一遍[确定初始 seed](#确定初始seed)步骤的2~6，且需尽快开机进入游戏以确保seed不变.*** 点击 ***Start*** 按钮的同时开始游戏(设置过的nds是直接开机，未设置过的nds系列是在主页面点击GBA游戏图标).
5. 在游戏中快速到达目标帧的确定位置（如：在选择宝可梦使用甜甜香气的界面）.
6. 在 *CCTimer* 上的倒计时归零的瞬间按下机器的 ***A*** 键，然后等待进入战斗界面.
7. 捕捉这只宝可梦.
8. 保存并关闭游戏，提取存档，使用读卡器连接到电脑后使用 PKHex 打开存档，查看刚捕捉的宝可梦的数据.
9. 回到乱数工具，在黄框中填入刚捕捉到的宝可梦数据（如果不是闪光记得不要勾选 ***只显示异色*** ），点击 *计算*. 记下橙色框中的数字（如有多个，选择离*目标帧*最近的）.
    ![Figure4](/images/body/Pokemon-RNG-Abuse-Gen3-Part1/Figure4.png)
10. 回到 *CCTimer*，计算*目标帧*减去刚刚橙色框中的数字的值，点击 ***Clear*** 按钮清除后输入该值并点击 ***Add*** .

    > 例如 CCTimer 中的值（目标帧）是2156，击中帧是2177，2156 - 2177 = -21（橙色框中数字为 21），那么将 CCTimer 中的值更新为 2156 - 21 = 2135.

误差校准完成.

> 注意，如果你更换了目标，即宝可梦获得方式改变（如Method不同 或 由游戏厅切换为固拉多），请重新进行误差校准！

## 乱数

***如果你的目标宝可梦不是野外宝可梦（如定点宝可梦），那么要先将备份存档恢复***
和校准误差的4、5、6步一致：

1. ***执行一遍[确定初始 seed](#确定初始seed)步骤的2~6，且需尽快开机进入游戏以确保seed不变.*** 点击 ***Start*** 按钮的同时开始游戏.
2. 在游戏中快速到达目标帧的确定位置.
3. 在 *CCTimer* 上的倒计时归零的瞬间按下机器的 ***A*** 键，然后等待进入战斗界面.
4. 如果得到的不是*目标帧*，可以选择再次进行误差校准或者再多尝试几次.

> 因为手工操作多少会有些误差，建议多尝试几次，若十几二十次失败再考虑重新校准误差.

5. 乱数成功，得到目标！

# 如果选用 RNGReporter

发现这两个软件在反查初始seed有些不同，下面记录一下RNGReporter反查seed的方法：

- 打开RNGReporter，选择*4th Gen Tools* 中的 *Calculate PID from IVs*.
  ![Figure9](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure9.png)
- 输入个体性格与你的ID，点击*Find*，选择**PID**对应的一栏.
  ![Figure10](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure10.png)
- 这里得到的seed是*生成seed*，将其输入工具*FRLGSeedFinder*中（虽然写的FRLG，但是三代通用）.
  ![Figure11](/images/body/Pokemon-RNG-Abuse-Gen3-Part2/Figure11.png)
- 得到初始seed.

# 写在后面

- 在[确定初始 seed](#确定初始seed)步骤可以多选择几个RTC时间，捉完宝可梦后保存然后再次重复，导出存档一起确定seed，然后选择最满意的.
- 还有一种比较麻烦的方法，在这里描述一下，十分费时费力，就不展开说了：
  - 准备大量的神奇糖果.
  - 使用玩家自制的软件 [FR/LG RNG Timer](https://www.smogon.com/forums/threads/fr-lg-rng-timer.3554964/). 也可以点击[这里](/download/FRLG_RNG_Timer.jar)进行下载.
  - 进入游戏的同时开始计时器.
  - 捕捉一只宝可梦并通过糖果确定个体.
  - 使用个体查出初始seed.
  - 查找该seed下满意的宝可梦，将目标帧数输入 FR/LG RNG Timer 点击 Submit.
  - 游戏推进到等待生成帧.
  - 倒计时结束触发生成帧.
  - 捕捉并通过糖果确认个体.
  - 利用个体查找击中帧数，记录校准值.
  - 利用校准值再来一次.

# Reference

- [3genSearch 作者博客](https://taiyaki3gen.hatenablog.com/entry/2020/05/30/162400)
- [Smogon RNG 教程](https://www.smogon.com/ingame/rng/)
- [RNG Manipulation in FireRed/LeafGreen: Wild Pokémon Supported in RNG Reporter 9.93](https://www.smogon.com/forums/threads/rng-manipulation-in-firered-leafgreen-wild-pok%C3%A9mon-supported-in-rng-reporter-9-93.62357/)
- [Programming - FR/LG RNG Timer](https://www.smogon.com/forums/threads/fr-lg-rng-timer.3554964/)

# Appreciation

- 感谢**Rai**为我纠正了一些错误.
