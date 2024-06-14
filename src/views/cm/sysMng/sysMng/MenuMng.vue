<template>
  <div class="menuManageArea">
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
            <b class="contTit1">메뉴 목록</b>
          </div>

          <div class="rightGroup">
            <div class="btnGroup">
              <button type="button" class="baseBtn small"><span class="base">추가</span></button>
              <button type="button" class="baseBtn small grayLine"><span class="base">상위이동</span></button>
              <button type="button" class="baseBtn small grayLine"><span class="base">하위이동</span></button>
            </div>
          </div>
        </div>
        <!-- tree 퍼블리싱 -->
        <!-- <div class="menuTreeArea">
          <ul class="depth1">
            <li>
              <label class="inputBox">
                <input type="checkbox" checked />
                <span class="data">소상공인유통물류</span>
              </label>

              <ul class="depth2">
                <li>
                  <label class="inputBox">
                    <input type="checkbox" checked />
                    <span class="data">메뉴명1</span>
                  </label>

                  <ul class="depth3">
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" checked />
                        <span class="data">메뉴명1</span>
                      </label>
                    </li>
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" />
                        <span class="data">메뉴명1</span>
                      </label>
                    </li>
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" />
                        <span class="data">메뉴명1</span>
                      </label>
                    </li>
                  </ul>
                </li>

                <li>
                  <label class="inputBox">
                    <input type="checkbox" checked />
                    <span class="data">메뉴명2</span>
                  </label>

                  <ul class="depth3">
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" checked />
                        <span class="data">메뉴명2</span>
                      </label>
                    </li>
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" />
                        <span class="data">메뉴명2</span>
                      </label>
                    </li>
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" />
                        <span class="data">메뉴명2</span>
                      </label>
                    </li>
                  </ul>
                </li>

                <li>
                  <label class="inputBox">
                    <input type="checkbox" checked />
                    <span class="data">메뉴명3</span>
                  </label>

                  <ul class="depth3">
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" checked />
                        <span class="data">메뉴명3</span>
                      </label>
                    </li>
                    <li>
                      <label class="inputBox">
                        <input type="checkbox" />
                        <span class="data">메뉴명3</span>
                      </label>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div> -->

        <!-- tree 라이브러리 사용 -->
        <div class="menuTreeArea">
          <Tree :value="menuList" v-model:expandedKeys="expandedKeys">
            <template #default="slotProps">
              <label class="inputBox">
                <input type="checkbox" />
                <span class="data">{{ slotProps.node.label }}</span>
              </label>
            </template>
          </Tree>
        </div>
      </div>

      <div class="division">
        <div class="optionTitle">
          <div class="leftGroup">
            <b class="contTit1">메뉴 상세</b>
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
                <p class="tit need">메뉴No <span class="scHdn">필수</span></p>
              </div>
              <input type="text" class="inputBase" title="메뉴No 입력해주세요" />
            </label>

            <label class="formInput">
              <div class="guide">
                <p class="tit need">메뉴순서 <span class="scHdn">필수</span></p>
              </div>
              <input type="text" class="inputBase" title="메뉴순서 입력해주세요" />
            </label>
          </div>

          <div class="row">
            <label class="formInput">
              <div class="guide">
                <p class="tit need">메뉴명 <span class="scHdn">필수</span></p>
              </div>
              <input type="text" class="inputBase" title="메뉴명 입력해주세요" />
            </label>

            <div class="formInput">
              <div class="guide">
                <p class="tit need">상위메뉴No <span class="scHdn">필수</span></p>
              </div>

              <div class="multOption">
                <div class="sechBox">
                  <input type="text" class="inputBase" title="상위메뉴No을 입력해주세요" readonly />
                  <button type="button" class="sechBtn"><span class="hidden">검색</span></button>
                </div>
                <span class="infoTxt">(상위메뉴)</span>
              </div>
            </div>
          </div>

          <div class="row flexEnd">
            <div class="formInput">
              <div class="guide">
                <p class="tit need">프로그램 <span class="scHdn">필수</span></p>
              </div>

              <div class="sechBox">
                <input type="text" class="inputBase" value="프로그램파일명" title="프로그램 입력해주세요" readonly />
                <button type="button" class="sechBtn"><span class="hidden">검색</span></button>
              </div>
            </div>

            <div class="formInput">
              <input type="text" class="inputBase" value="프로그램명" title="프로그램명 입력해주세요" readonly />
            </div>
          </div>
          <div class="row">
            <label class="formInput">
              <div class="guide">
                <p class="tit">메뉴설명</p>
              </div>
              <textarea rows="6" class="inputTextarea" title="메뉴설명 입력하세요"></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu.js'
import { storeToRefs } from 'pinia'
import Tree from 'primevue/tree'

const menuStore = useMenuStore()
const { menus } = storeToRefs(menuStore)
const menuList = ref([])
const expandedKeys = ref({ root: true })

const createMenuTree = (data) => {
  const menuMap = {}
  const rootMenus = []
  const MENU_ROOT = {
    key: 'root',
    label: '소상공인유통물류',
    children: []
  }

  data.forEach((item) => {
    menuMap[item.menuId] = { ...item, children: [] }
  })

  data.forEach((item) => {
    const index = item.orderSeq - 1
    if (item.upperMenuId) {
      menuMap[item.upperMenuId].children.splice(index, 0, menuMap[item.menuId])
    } else {
      rootMenus.splice(index, 0, menuMap[item.menuId])
    }
  })

  const assignMenuAttributes = (menus, parentKey = '') => {
    menus.forEach((menu) => {
      const currentKey = parentKey ? `${parentKey}-${menu.orderSeq}` : menu.orderSeq.toString()
      menu.key = currentKey
      menu.label = menu.menuNm
      menu.data = menu.menuNm
      if (menu.children.length > 0) {
        assignMenuAttributes(menu.children, currentKey)
      }
    })
  }
  assignMenuAttributes(rootMenus)

  return [{ ...MENU_ROOT, children: [...rootMenus] }]
}

onMounted(() => {
  menuList.value = createMenuTree(menus.value)
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/contA.css';

:deep() {
  .menuTreeArea {
    & .p-tree-container {
      & > .p-treenode {
        & > .p-treenode-content {
          & .p-tree-toggler {
            display: none;
          }
        }
      }
    }

    position: relative;
    border-top: 1px solid #646a7a;
    padding: 25px 0 25px 25px;
    height: 500px;
    overflow-y: auto;

    & .p-treenode-content {
      display: flex;
      align-items: center;
      gap: 5px;

      & .p-tree-toggler {
        order: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding-top: 1px;
      }

      & .p-treenode-icon {
        display: none;
      }

      & .inputBox {
        margin: 0;

        & .data {
          font-weight: 500;
        }

        &:hover {
          color: var(--primary);
        }
      }
    }

    & .p-treenode-children {
      padding-left: 28px;

      & .p-treenode {
        margin-top: 15px;

        &::before {
          content: '';
          position: absolute;
          left: -17px;
          top: 13px;
          display: block;
          width: 17px;
          height: 1px;
          border-top: 1px dashed #d1d1d1;
        }

        &::after {
          content: '';
          position: absolute;
          left: -18px;
          top: -25px;
          display: block;
          width: 1px;
          height: calc(100% + 14px);
          border-left: 1px dashed #d1d1d1;
        }

        &:first-of-type::after {
          content: '';
          top: -16px;
          height: calc(100% + 4px);
        }

        &:last-of-type::after {
          content: '';
          height: 38px;
        }

        &:first-of-type:last-of-type::after {
          content: '';
          height: 28px;
        }

        &[aria-level='2'] {
          margin-top: 20px;

          &::after {
            top: -20px;
            height: calc(100% + 19px);
          }

          &:last-of-type::after {
            height: 33px;
          }
        }
      }

      & .p-treenode {
        & .inputBox > input[type='checkbox'] + .data {
          background:
            url(/src/assets/img/common/icon_checkOff.svg) no-repeat left top 3px/20px auto,
            url(/src/assets/img/contents/icon_menuFolder.svg) no-repeat left 28px top 6px;
          padding-left: 51px;
        }

        & .inputBox > input[type='checkbox']:checked + .data {
          background:
            url(/src/assets/img/common/icon_checkOn.svg) no-repeat left top 3px/20px auto,
            url(/src/assets/img/contents/icon_menuFolder.svg) no-repeat left 28px top 6px;
        }
      }
    }

    & .p-treenode {
      position: relative;

      &.p-treenode-leaf {
        & .p-tree-toggler {
          display: none;
        }

        & .inputBox > input[type='checkbox'] + .data {
          background:
            url(/src/assets/img/common/icon_checkOff.svg) no-repeat left top 3px/20px auto,
            url(/src/assets/img/contents/icon_menuFile.svg) no-repeat left 28px top 4px;
          padding-left: 47px;
        }

        & .inputBox > input[type='checkbox']:checked + .data {
          background:
            url(/src/assets/img/common/icon_checkOn.svg) no-repeat left top 3px/20px auto,
            url(/src/assets/img/contents/icon_menuFile.svg) no-repeat left 28px top 4px;
        }
      }
    }
  }
}
</style>
