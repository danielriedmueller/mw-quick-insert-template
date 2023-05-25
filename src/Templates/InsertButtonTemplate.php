<?php

namespace MediaWiki\Extension\QuickInsertTemplates\Templates;

use QuickTemplate;

class InsertButtonTemplate extends QuickTemplate
{
    /**
     * @inheritDoc
     */
    public function execute()
    {
        ?>
            <div>
                <button id="quick-insert-templates-top">Insert Template</button>
                <select id="quick-insert-templates-top-select" class="hidden">
                    <option value="">Select a template</option>
                    <?php foreach ($this->data['templates'] as $template): ?>
                        <option value="<?php echo $template; ?>"><?php echo $template; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        <?php
    }
}
