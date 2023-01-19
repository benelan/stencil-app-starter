import { Component, Prop, h, VNode } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';
import type { CalciteTreeCustomEvent, JSX } from '@esri/calcite-components';

const treeProps: JSX.CalciteTree = {
  lines: true,
  scale: 's',
  onCalciteTreeSelect: (e: CalciteTreeCustomEvent<void>) => e.target.selectedItems.forEach(itemElt => (itemElt.selected = false)),
};

const expandableTreeItemProps = {
  onClick: (e: MouseEvent) => {
    const item = e.currentTarget as HTMLCalciteTreeItemElement;
    item.expanded = !item.expanded;
  },
};

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  @Prop() match: MatchResults;

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return '';
  }

  private renderTree(subtree = false): VNode | null {
    return (
      <calcite-tree {...treeProps} slot={subtree ? 'children' : undefined}>
        <calcite-tree-item expanded {...expandableTreeItemProps}>
          {this.renderNestedTree(true)}
        </calcite-tree-item>
      </calcite-tree>
    );
  }

  private renderTreeItem(expanded = false): VNode {
    return (
      <calcite-tree-item expanded={expanded} {...expandableTreeItemProps}>
        Test
      </calcite-tree-item>
    );
  }

  private renderNestedTree(subtree = false): VNode {
    return (
      <calcite-tree {...treeProps} slot={subtree ? 'children' : undefined}>
        {this.renderTreeItem(true)}
      </calcite-tree>
    );
  }
  render() {
    if (this.match && this.match.params.name) {
      return (
        <div class="app-profile">
          <p>Hello! My name is {this.normalize(this.match.params.name)}. My name was passed in through a route param!</p>
          {this.renderTree()}
        </div>
      );
    }
  }
}
