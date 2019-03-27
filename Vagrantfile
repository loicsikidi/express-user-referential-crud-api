# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.synced_folder ".", "/srv/server"
  config.ssh.insert_key = true

  config.vm.provider :virtualbox do |v|
     v.name = "suricats-api"
     v.memory = 2048
     v.linked_clone = true
  end

  config.vm.define :suricatsapi do |app|
     app.vm.hostname = "suricats-api.local.com"
     app.vm.network :private_network, ip: "192.168.60.8"
     app.vm.network "forwarded_port", guest: 8080, host: 9080
     app.vm.network "forwarded_port", guest: 9229, host: 9229
  end

  # Ansible provisioner.
  config.vm.provision "ansible" do |ansible|
     ansible.playbook = "provisioning/playbook.yml"
     ansible.inventory_path = "provisioning/inventories/inventory"
  end

end
