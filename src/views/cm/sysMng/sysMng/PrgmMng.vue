<template>
  <div class="programManageArea">
    <div class="inqBox sech">
      <div class="optionRow">
        <div class="item">
          <b class="optTit">프로그램명</b>
          <div class="multOption">
            <input type="text" class="inputBase" placeholder="입력해주세요." title="프로그램명을 입력해주세요" />
            <button type="button" class="baseBtn"><span class="base">조회</span></button>
          </div>
        </div>
      </div>

      <button type="button" class="resetBtn"><span class="base">초기화</span></button>
    </div>

    <div class="contGorup half">
      <div class="division">
        <div class="optionTitle">
          <div class="leftGroup">
            <b class="contTit1">프로그램 목록</b>
          </div>

          <div class="rightGroup">
            <div class="btnGroup">
              <button type="button" class="baseBtn small"><span class="base">등록</span></button>
              <button type="button" class="baseBtn small grayLine"><span class="base">일괄삭제</span></button>
            </div>
          </div>
        </div>

        <div class="contTable yScroll" style="height: 500px">
          <table style="min-width: 600px">
            <caption class="scHdn">
              프로그램파일명, 프로그램명, URL 선택 표
            </caption>
            <colgroup>
              <col style="width: 50px" />
              <col style="width: 190px" />
              <col style="width: 110px" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </th>
                <th scope="col">프로그램파일명</th>
                <th scope="col">프로그램명</th>
                <th scope="col">URL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" checked="" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListInquire</td>
                <td class="txtL">상담관리조회</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListDelete</td>
                <td class="txtL">상담관리삭제</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListModify</td>
                <td class="txtL">상담관리수정</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListRegist</td>
                <td class="txtL">상담관리등록</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerView</td>
                <td class="txtL">상담보기</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListInquire</td>
                <td class="txtL">상담관리조회</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListDelete</td>
                <td class="txtL">상담관리삭제</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListModify</td>
                <td class="txtL">상담관리수정</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerListRegist</td>
                <td class="txtL">상담관리등록</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
              <tr>
                <td>
                  <label class="inputBox only">
                    <input type="checkbox" />
                    <span class="data"></span>
                  </label>
                </td>
                <td class="txtL">CnsltAnswerView</td>
                <td class="txtL">상담보기</td>
                <td class="txtL">/user/olp/cnm/CnslAnswer.do</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="numberPagination">
          <button type="button" class="first"><span class="scHdn">처음</span></button>
          <button type="button" class="prev"><span class="scHdn">이전</span></button>

          <!-- 모바일에서는 5번까지 노출 -->
          <ul class="paging">
            <li><button type="button">1</button></li>
            <li class="pagingDot"></li>
            <li><button type="button">3</button></li>
            <li><button type="button">4</button></li>
            <li><button type="button" class="on">5</button></li>
            <li><button type="button">6</button></li>
            <li><button type="button">7</button></li>
            <li class="pagingDot"></li>
            <li><button type="button">120</button></li>
          </ul>

          <button type="button" class="next"><span class="scHdn">다음</span></button>
          <button type="button" class="last"><span class="scHdn">끝</span></button>
        </div>
      </div>

      <div class="division">
        <div class="optionTitle">
          <div class="leftGroup">
            <b class="contTit1">프로그램 상세</b>
          </div>

          <div class="rightGroup">
            <div class="btnGroup">
              <button type="button" class="baseBtn small"><span class="base">저장</span></button>
              <button type="button" class="baseBtn small grayLine"><span class="base">삭제</span></button>
            </div>
          </div>
        </div>

        <div class="lineBox">
          <div class="row">
            <label class="formInput">
              <div class="guide">
                <p class="tit need">프로그램파일명 <span class="scHdn">필수</span></p>
              </div>
              <input type="text" class="inputBase" title="프로그램파일명을 입력해주세요" />
            </label>
          </div>

          <div class="row">
            <label class="formInput">
              <div class="guide">
                <p class="tit need">저장경로 <span class="scHdn">필수</span></p>
              </div>
              <input type="text" class="inputBase" title="저장경로을 입력해주세요" />
            </label>
          </div>

          <div class="row">
            <label class="formInput">
              <div class="guide">
                <p class="tit need">프로그램명 <span class="scHdn">필수</span></p>
              </div>
              <input type="text" class="inputBase" title="프로그램명을 입력해주세요" />
            </label>
          </div>

          <div class="row">
            <label class="formInput">
              <div class="guide">
                <p class="tit need">URL <span class="scHdn">필수</span></p>
              </div>
              <input type="text" class="inputBase" title="URL을 입력해주세요" />
            </label>
          </div>

          <div class="row">
            <label class="formInput">
              <div class="guide">
                <p class="tit">프로그램설명</p>
              </div>
              <textarea rows="2" class="inputTextarea" title="프로그램설명을 입력하세요"></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { prgmMng as prgmService } from '@/services/sysMng/sysMng.js'

onMounted(() => {
  getList()
})

const getList = async () => {
  const result = await prgmService.list()
  console.log('result', result)
}
</script>

<style scoped>
@import '@/assets/css/contA.css';
</style>
